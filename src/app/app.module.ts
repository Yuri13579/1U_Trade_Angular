// import { AppService } from './app.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SaleComponent } from './components/sale/sale.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductComponent } from './components/product/product.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { ShopsComponent } from './components/shops/shops.component';
import { SellGoodsComponent } from './components/sell-goods/sell-goods.component';
import { ProviderComponent } from './components/provider/provider.component';
import { LoginComponent } from './components/login/login.component';
import {ToasterModule} from 'angular2-toaster';
import { from } from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtModule} from '@auth0/angular-jwt';
import { TokenInterception } from './token.interception';
import { AuthGuard } from './auth.guard';
import { RoleAuthGuard as RoleGuard } from './role.auth.guard';
import { PersonComponent } from './components/person/person.component';
import { LogoutComponent } from './components/logout/logout.component';

const appRoutes: Routes = [
{path: 'login', component: LoginComponent},
{path: 'logout', component: LogoutComponent},
{path: 'sale', component: SaleComponent, canActivate: [AuthGuard]},
{path: 'product', component: ProductComponent, canActivate: [AuthGuard]},
{path: 'shop', component: ShopsComponent, canActivate: [AuthGuard]},
{path: 'sellGoods', component: SellGoodsComponent, canActivate: [AuthGuard]},
{path: 'provider', component: ProviderComponent, canActivate: [RoleGuard],
data: {
  expectedRole: 'companyadmin'
} },
{path: 'person', component: PersonComponent, canActivate: [AuthGuard]},
{path: '**', component: NotFoundComponent},
];
export function tokenGetter() {
  return this.appService.getToken$.subscribe(res => {
    if (res) {
    console.warn('tokenGetter', res);
    return res;
  }
  });
}

@NgModule({
  declarations: [
    AppComponent,
    SaleComponent,
    ProductComponent,
    NotFoundComponent,
    ForbiddenComponent,
    ShopsComponent,
    SellGoodsComponent,
    ProviderComponent,
    LoginComponent,
    PersonComponent,
    LogoutComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ToasterModule.forRoot(),
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        skipWhenExpired: true
      }
    }),
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterception,
    multi: true
  },
  AuthGuard,
  RoleGuard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
export const routingComponents = [ SaleComponent, ProductComponent ]
