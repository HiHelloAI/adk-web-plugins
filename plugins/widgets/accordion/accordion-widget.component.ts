import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionWidget, AccordionItem, WidgetActionEvent } from '../core/widget-models';

@Component({
  selector: 'app-accordion-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion-widget.component.html',
  styleUrls: ['./accordion-widget.component.scss']
})
export class AccordionWidgetComponent {
  @Input() widget!: AccordionWidget;
  @Input() theme: string = 'light';
  @Output() widgetAction = new EventEmitter<WidgetActionEvent>();

  /**
   * Toggle accordion item expand/collapse
   */
  toggleItem(item: AccordionItem): void {
    // If allowMultiple is false, close all other items
    if (!this.widget.allowMultiple && !item.expanded) {
      this.widget.items.forEach(i => {
        if (i !== item) {
          i.expanded = false;
        }
      });
    }

    // Toggle the clicked item
    item.expanded = !item.expanded;

    // Emit event for tracking
    this.widgetAction.emit({
      type: 'accordion-toggle',
      data: {
        itemId: item.id,
        itemTitle: item.title,
        expanded: item.expanded
      }
    });
  }
}
