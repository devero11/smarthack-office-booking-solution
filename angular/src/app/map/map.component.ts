import { AfterViewInit, Component ,ElementRef, ViewChild} from '@angular/core';
import svgPanZoom from 'svg-pan-zoom';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent  {

  private panZoom: SvgPanZoom.Instance;
  private zoomWindow = false;
  private boxElement: HTMLDivElement;
  private startPt: PointLike;
  private currentPt: PointLike;

  private controlState: {
    isControlIconsEnabled?: boolean;
    isDblClickZoomEnabled?: boolean;
    isMouseWheelZoomEnabled?: boolean;
    isPanEnabled?: boolean;
    isZoomEnabled?: boolean;
  } = {};

  @ViewChild('svg', {static: false}) svg: ElementRef<SVGSVGElement>;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.panZoom = SvgPanZoom(this.svg.nativeElement, {
      zoomEnabled: true,
      controlIconsEnabled: true,
      maxZoom: 1000,
    });
    this.saveControlState();
  }

  onClick(event: MouseEvent) {
    console.log('click', event.target, event);
    this.endZoomWindow();
  }

  onZoomWindow() {
    console.log('onZoomWindow');
    this.startZoomWindow();
  }

  private startZoomWindow() {
    this.zoomWindow = true;
    this.saveControlState();
    this.disableControls();
  }

  private endZoomWindow() {
    this.zoomWindow = false;
    this.restoreControlState();
    if (this.boxElement) {
      this.boxElement.remove();
    }
  }

  onDragStart(event: MouseEvent) {
    if (this.zoomWindow) {
      console.log('onDragStart');

      this.startPt = event;
      const div = document.createElement('div');
      div.classList.add('select-box');
      div.style.pointerEvents = 'none';
      div.style.border = '1px solid #55aaff';
      div.style.backgroundColor = 'rgba(75, 160, 255, 0.3)';
      div.style.position = 'fixed';
      this.el.nativeElement.appendChild(div);
      this.boxElement = div;
    }
  }

  onDragEnd(event: MouseEvent) {
    if (this.zoomWindow) {
      console.log('onDragEnd');
      const box = this.boxElement.getBoundingClientRect();
      this.zoomToClientRect(box);
      this.endZoomWindow();
    }
  }

  onDragMove(event: MouseEvent) {
    if (this.zoomWindow) {
      console.log('onDragMove');

      this.currentPt = event;
      this.updateBoxElement();
    }
  }

  private updateBoxElement() {
    const {startPt, currentPt, boxElement} = this;
    const top = Math.min(startPt.y, currentPt.y);
    const right = Math.max(startPt.x, currentPt.x);
    const bottom = Math.max(startPt.y, currentPt.y);
    const left = Math.min(startPt.x, currentPt.x);
    boxElement.style.top = `${top}px`;
    boxElement.style.left = `${left}px`;
    boxElement.style.width = `${right - left}px`;
    boxElement.style.height = `${bottom - top}px`;
  }

  private disableControls() {
    console.log('disable controls');
    this.panZoom.disableControlIcons();
    this.panZoom.disableDblClickZoom();
    this.panZoom.disableMouseWheelZoom();
    this.panZoom.disablePan();
    this.panZoom.disableZoom();
  }

  private saveControlState() {
    const {controlState, panZoom} = this;

    controlState.isControlIconsEnabled = panZoom.isControlIconsEnabled();
    controlState.isDblClickZoomEnabled = panZoom.isDblClickZoomEnabled();
    controlState.isMouseWheelZoomEnabled = panZoom.isMouseWheelZoomEnabled();
    controlState.isPanEnabled = panZoom.isPanEnabled();
    controlState.isZoomEnabled = panZoom.isZoomEnabled();
  }

  private restoreControlState() {
    const {controlState, panZoom} = this;
    const {
      isControlIconsEnabled,
      isDblClickZoomEnabled,
      isMouseWheelZoomEnabled,
      isPanEnabled,
      isZoomEnabled,
    } = controlState;

    isControlIconsEnabled && panZoom.enableControlIcons() || panZoom.disableControlIcons();
    isDblClickZoomEnabled && panZoom.enableDblClickZoom() || panZoom.disableDblClickZoom();
    isMouseWheelZoomEnabled && panZoom.enableMouseWheelZoom() || panZoom.disableMouseWheelZoom();
    isPanEnabled && panZoom.enablePan() || panZoom.disablePan();
    isZoomEnabled && panZoom.enableZoom() || panZoom.disableZoom();
  }

  onZoomObjects() {
    const objects = Array.from(this.svg.nativeElement.querySelectorAll('circle'));
    if (objects.length) {
      this.zoomToClientRect(getBoundingClientRect(objects));
      this.panZoom.zoomBy(0.95);
    }
  }

  private zoomToClientRect(rect: {left: number, top: number, width: number, height: number}) {
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    // Adjust by any parent offsets
    const svgRect = this.svg.nativeElement.getBoundingClientRect();
    center.x -= svgRect.left;
    center.y -= svgRect.top;

    // Adjust by viewport origin
    const sizes = this.panZoom.getSizes();
    const pan = {
      x: (sizes.width / 2) - center.x,
      y: (sizes.height / 2) - center.y,
    };

    const scale = Math.min(
      sizes.width / rect.width,
      sizes.height / rect.height,
    );

    this.panZoom.panBy(pan);
    this.panZoom.zoomBy(scale);
  }

  onFilter(event: {event: PointerEvent, ignore: boolean}) {
    const controlIcons = this.svg.nativeElement.querySelector('#svg-pan-zoom-controls');
    if (controlIcons && controlIcons.contains(event.event.target as Node)) {
      event.ignore = true;
      console.log('ignored');
    }
  }

}

function getBoundingClientRect(elems: Element[]): {left: number, top: number, width: number, height: number} {
  return elems.map(el => el.getBoundingClientRect())
    .reduce((acc, rect) => {
      if (!acc.width && !acc.height) {
        acc.left = rect.left;
        acc.top = rect.top;
        acc.width = rect.width;
        acc.height = rect.height;
      } else {
        acc.width = Math.max(acc.width, Math.abs(rect.left - acc.left) + rect.width);
        acc.height = Math.max(acc.height, Math.abs(rect.top - acc.top) + rect.height);
        acc.left = Math.min(acc.left, rect.left);
        acc.top = Math.min(acc.top, rect.top);
      }
      return acc;
    }, {left: 0, top: 0, width: 0, height: 0});
}

