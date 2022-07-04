import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("draggable", { read: ElementRef }) draggable: ElementRef;

  title = "CodeSandbox";
  scale = 1;
  panning = false;
  pointX = 0;
  pointY = 0;
  start = { x: 0, y: 0 };

  setTransform() {
    this.draggable.nativeElement.style.transform =
      "translate(" +
      this.pointX +
      "px, " +
      this.pointY +
      "px) scale(" +
      this.scale +
      ")";
  }

  mousedown(e) {
    e.preventDefault();
    this.start = { x: e.clientX - this.pointX, y: e.clientY - this.pointY };
    this.panning = true;
  }

  mouseup(e) {
    this.panning = false;
  }

  mouseover(e) {
    e.preventDefault();
    if (!this.panning) {
      return;
    }
    this.pointX = e.clientX - this.start.x;
    this.pointY = e.clientY - this.start.y;
    this.setTransform();
  }

  onwheel(e) {
    e.preventDefault();
    var xs = (e.clientX - this.pointX) / this.scale,
      ys = (e.clientY - this.pointY) / this.scale,
      delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
    delta > 0 ? (this.scale *= 1.2) : (this.scale /= 1.2);
    this.pointX = e.clientX - xs * this.scale;
    this.pointY = e.clientY - ys * this.scale;

    this.setTransform();
  }
}
