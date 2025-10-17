import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signature-canvas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas
      #canvas
      [attr.width]="width"
      [attr.height]="height"
      style="touch-action: none; width: 100%; border: 1px solid rgba(0,0,0,0.1); border-radius: 8px;"
    ></canvas>
  `,
})
export class SignatureCanvasComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  /** Canvas size (CSS scaling handled by width:100% style) */
  @Input() width = 600;
  @Input() height = 200;

  /** Stroke config */
  @Input() strokeColor = '#000000';
  @Input() lineWidth = 2;

  /** Emits every time the user finishes a stroke (dataURL) */
  @Output() signatureChange = new EventEmitter<string>();
  /** Emits when cleared */
  @Output() cleared = new EventEmitter<void>();

  private ctx!: CanvasRenderingContext2D;
  private drawing = false;

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.lineWidth = this.lineWidth;

    // Mouse
    canvas.addEventListener('mousedown', this.startDraw, { passive: false });
    canvas.addEventListener('mouseup', this.endDraw, { passive: false });
    canvas.addEventListener('mousemove', this.draw, { passive: false });

    // Touch
    canvas.addEventListener('touchstart', this.startDraw, { passive: false });
    canvas.addEventListener('touchend', this.endDraw, { passive: false });
    canvas.addEventListener('touchmove', this.draw, { passive: false });
  }

  ngOnDestroy(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.removeEventListener('mousedown', this.startDraw as any);
    canvas.removeEventListener('mouseup', this.endDraw as any);
    canvas.removeEventListener('mousemove', this.draw as any);
    canvas.removeEventListener('touchstart', this.startDraw as any);
    canvas.removeEventListener('touchend', this.endDraw as any);
    canvas.removeEventListener('touchmove', this.draw as any);
  }

  /** Public API: clear the canvas */
  clear(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.cleared.emit();
    this.signatureChange.emit(''); // empty signature
  }

  /** Public API: get current signature as data URL */
  toDataURL(type: string = 'image/png', quality?: number): string {
    return this.canvasRef.nativeElement.toDataURL(type, quality);
  }

  /** Public API: get current signature as Blob (async) */
  toBlob(type: string = 'image/png', quality?: number): Promise<Blob | null> {
    const canvas = this.canvasRef.nativeElement;
    return new Promise(resolve => canvas.toBlob(resolve, type, quality));
  }

  // ===== Internal drawing handlers =====
  startDraw = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    this.drawing = true;
    const { x, y } = this.getEventPosition(event);
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  };

  draw = (event: MouseEvent | TouchEvent) => {
    if (!this.drawing) return;
    event.preventDefault();
    const { x, y } = this.getEventPosition(event);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  };

  endDraw = (event: MouseEvent | TouchEvent) => {
    if (!this.drawing) return;
    event.preventDefault();
    this.drawing = false;
    // Emit latest data URL after a stroke ends
    this.signatureChange.emit(this.canvasRef.nativeElement.toDataURL('image/png'));
  };

  private getEventPosition(event: MouseEvent | TouchEvent): { x: number; y: number } {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();

    if (event instanceof TouchEvent) {
      const t = event.touches[0] ?? (event as any).changedTouches?.[0];
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    } else {
      const e = event as MouseEvent;
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
  }

  // Optional: update stroke at runtime if @Inputs change
  @HostListener('window:signature-config-refresh')
  refreshStrokeStyle() {
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.lineWidth = this.lineWidth;
  }
}
