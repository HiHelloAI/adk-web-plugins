import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselWidget, WidgetActionEvent } from '../core/widget-models';

@Component({
  selector: 'app-carousel-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-widget.component.html',
  styleUrls: ['./carousel-widget.component.scss']
})
export class CarouselWidgetComponent {
  @Input() widget!: CarouselWidget;
  @Input() theme: string = 'light';
  @Output() widgetAction = new EventEmitter<WidgetActionEvent>();
}
