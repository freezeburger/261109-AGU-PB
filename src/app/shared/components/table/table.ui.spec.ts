import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TableUi } from './table.ui';

@Component({
  imports: [TableUi],
  template: `
    <app-table [striped]="true" [loading]="true">
      <table>
        <tbody>
          <tr><td>12</td></tr>
        </tbody>
      </table>
    </app-table>
  `,
})
class HostComponent {}

describe('TableUi', () => {
  it('should project the table and expose its state on the host', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const host = fixture.nativeElement.querySelector('app-table') as HTMLElement;

    expect(host.querySelector('.table-scroll table td')?.textContent).toBe('12');
    expect(host.classList).toContain('striped');
    expect(host.getAttribute('aria-busy')).toBe('true');
  });
});
