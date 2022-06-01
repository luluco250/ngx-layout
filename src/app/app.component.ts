import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `
        <ngx-layout-container
            id="root-container"
            [vertical]="true"
        >
            <div first>Hello</div>
            <ngx-layout-container second>
                <div first>World</div>
                <ngx-layout-container second [vertical]="true">
                    <div first>123</div>
                    <div second>456</div>
                </ngx-layout-container>
            </ngx-layout-container>
        </ngx-layout-container>
    `,
    styles: [
        `
            #root-container {
                position: absolute;
                left: 0;
                top: 0;
                width: 100vw;
                height: 100vh;
            }
        `,
    ],
})
export class AppComponent {}
