import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div style="min-height:100dvh;display:grid;place-items:center">
      <h2>🏠 Home (placeholder)</h2>
      <p>Cuando existan APIs, esta vista se protegerá con guards.</p>
    </div>
  `
})
export class HomeComponent {}
