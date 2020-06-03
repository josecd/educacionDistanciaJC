import {
    NbChatModule,
    NbDatepickerModule,
    NbDialogModule,
    NbMenuModule,
    NbCardModule,
    NbSidebarModule,
    NbLayoutModule,
    NbToastrModule,
    NbWindowModule,
    NbActionsModule,
    NbSearchModule,
    NbUserModule,
    NbContextMenuModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbThemeModule,
    NbAlertModule,
    NbInputModule,
    NbCheckboxModule,
    NbRadioModule,
    NbTabsetModule,
    NbTooltipModule,
    NbToggleModule,
    NbToastrService,
  } from '@nebular/theme';
  import { NgModule } from '@angular/core';

@NgModule({
    exports: [
        NbToastrModule,
        NbAlertModule,
    ]
})
export class nebularModule { }