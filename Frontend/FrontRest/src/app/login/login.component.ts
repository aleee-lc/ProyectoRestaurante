import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <section class="login-shell">
    <!-- Header mini -->
    <header class="mini-header">
      <img *ngIf="logoUrl()" [src]="logoUrl()" alt="logo" />
      <span *ngIf="!logoUrl()">{{ brand() }}</span>
    </header>

    <!-- Columna izquierda -->
    <div class="left">
      <h1 class="hero">{{ title() }}</h1>
    </div>

    <!-- Columna derecha -->
    <div class="right">
      <form class="card" [formGroup]="form" (ngSubmit)="onSubmit()">
        <label class="label" for="user">User:</label>
        <input id="user" type="text" formControlName="user" placeholder="Tu usuario" />

        <label class="label" for="password">Password:</label>
        <input id="password" type="password" formControlName="password" placeholder="••••••••" />

        <button class="primary" type="submit" [disabled]="form.invalid">Ingresar</button>
        <p *ngIf="msg()" class="hint">{{ msg() }}</p>
      </form>
    </div>

    <!-- Footer -->
    <footer class="mini-footer">Powered by {{ poweredBy() }}</footer>
  </section>
  `,
  styles: [`
    :host{display:block}
    .login-shell{
      min-height:100dvh; width:100%;
      display:grid; grid-template-columns:1fr 1fr; gap:24px; position:relative;
      background: linear-gradient(135deg, #002A5E, #0265FF); color:#fff;
    }
    .mini-header{
      position:absolute; top:24px; left:24px; display:flex; align-items:center; gap:8px;
      font-size:12px; font-weight:500; letter-spacing:.5px;
    }
    .mini-header img{ height:22px; object-fit:contain }
    .left{ display:flex; align-items:center; padding:0 6vw; }
    .hero{
      font-weight:700; font-size:clamp(32px,4vw,48px); line-height:1.1; max-width:20ch;
      text-shadow:0 2px 6px rgba(0,0,0,.3);
    }
    .right{ display:flex; align-items:center; padding:0 6vw; }
    .card{
      width:min(420px,90%); display:flex; flex-direction:column; gap:14px;
      border-radius:16px; padding:28px;
      background: rgba(255,255,255,.20);
      backdrop-filter: blur(12px);
      box-shadow:0 4px 20px rgba(0,0,0,.25);
    }
    .label{ font-size:13px; font-weight:500 }
    input{
      border:0; border-radius:10px; padding:12px 14px; font-size:15px;
      background: rgba(255,255,255,.30); color:#fff; outline:none;
    }
    input::placeholder{ color:rgba(255,255,255,.7) }
    input:focus{ background:rgba(255,255,255,.40); border:1px solid rgba(255,255,255,.85) }
    .primary{
      margin-top:6px; padding:12px 14px; border-radius:12px; border:0;
      background: rgba(255,255,255,.28); color:#fff; font-weight:600; cursor:pointer;
      transition:.25s;
    }
    .primary:hover{ background: rgba(255,255,255,.45) }
    .primary:disabled{ opacity:.5; cursor:not-allowed }
    .hint{ color:#e9f1ff; font-size:12px; margin:4px 0 0 }
    .mini-footer{ position:absolute; bottom:18px; left:24px; font-size:12px; opacity:.9 }
    @media (max-width:1024px){
      .login-shell{ grid-template-columns:1fr }
      .left{ order:1; padding:5vh 6vw 0; text-align:center; justify-content:center }
      .right{ order:2; padding:2vh 6vw 8vh; justify-content:center }
      .mini-footer{ left:50%; transform:translateX(-50%) }
    }
  `]
})
export class LoginComponent {
  // Texto/branding por defecto
  logoUrl = signal<string>('');
  brand = signal('MY LOGO');
  title = signal('REST LOGO–PERSONALIZABLE');
  poweredBy = signal('AleSoft');

  msg = signal(''); // mensajes de UI

  // ✅ FormBuilder inyectado con inject()
  private fb = inject(FormBuilder);

  // ✅ Ya podemos usar fb en inicializadores sin TS2729
  form = this.fb.group({
    user: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  // sin constructor

  onSubmit() {
    if (this.form.invalid) return;
    const { user } = this.form.getRawValue();
    this.msg.set(`Hola ${user}, aquí dispararíamos el login cuando existan APIs.`);
  }
}
