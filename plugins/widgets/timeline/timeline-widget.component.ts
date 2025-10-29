import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineWidget, WidgetActionEvent } from '../core/widget-models';

@Component({
  selector: 'app-timeline-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline-widget.component.html',
  styleUrls: ['./timeline-widget.component.scss']
})
export class TimelineWidgetComponent {
  @Input() widget!: TimelineWidget;
  @Input() theme: string = 'light';
  @Output() widgetAction = new EventEmitter<WidgetActionEvent>();
}
