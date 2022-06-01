import { Component, ElementRef, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "ngx-layout-container",
    template: `
        <div
            class="ngx-layout-component"
            [style.--ngx-layout-percent]="percentStyle"
            [class.ngx-layout-component--vertical]="vertical"
        >
            <div class="ngx-layout-component__first">
                <ng-content select="[first]"></ng-content>
            </div>
            <div
                class="ngx-layout-component__splitter"
                (pointerdown)="onPointerDownSplitter($event)"
                (pointerup)="onPointerUpSplitter($event)"
                (pointermove)="onPointerMoveSplitter($event)"
            ></div>
            <div class="ngx-layout-component__second">
                <ng-content select="[second]"></ng-content>
            </div>
        </div>
    `,
    styleUrls: ["container.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ContainerComponent {
    @Input()
    public percent = 0.5;

    @Input()
    public vertical = false;

    public constructor(private readonly _elementRef: ElementRef<HTMLElement>) {}

    public get percentStyle(): string {
        return Math.max(Math.min(this.percent * 100, 100), 0) + "%";
    }

    public onPointerDownSplitter(e: PointerEvent): void {
        e.preventDefault();
        const splitter = e.target as HTMLElement;
        splitter.setPointerCapture(e.pointerId);
    }

    public onPointerUpSplitter(e: PointerEvent): void {
        e.preventDefault();
        const splitter = e.target as HTMLElement;
        splitter.releasePointerCapture(e.pointerId);
    }

    public onPointerMoveSplitter(e: PointerEvent): void {
        e.preventDefault();
        const splitter = e.target as HTMLElement;

        if (splitter.hasPointerCapture(e.pointerId)) {
            const rect = this._elementRef.nativeElement.getBoundingClientRect();
            this.percent = this.vertical
                ? (e.clientY - rect.top) / rect.height
                : (e.clientX - rect.left) / rect.width;
        }
    }
}
