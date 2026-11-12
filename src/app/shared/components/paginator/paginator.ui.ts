import { Component, computed, input, model } from '@angular/core';

/**
 * Pagination « Précédent 1 2 3 … 7 Suivant ».
 * <app-paginator [(page)]="page" [total]="128" [pageSize]="20" />
 */
@Component({
  selector: 'app-paginator',
  styleUrl: './paginator.ui.scss',
  templateUrl: './paginator.ui.html',
})
export class PaginatorUi {
  /** Page courante, commence à 1. */
  page = model(1);
  total = input(0);
  pageSize = input(20);

  protected totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));
  protected firstItem = computed(() =>
    this.total() === 0 ? 0 : (this.page() - 1) * this.pageSize() + 1,
  );
  protected lastItem = computed(() => Math.min(this.page() * this.pageSize(), this.total()));

  /** Liste des boutons à afficher ; 0 représente « … ». */
  protected pages = computed(() => {
    const current = this.page();
    const last = this.totalPages();
    const result: number[] = [];

    for (let p = 1; p <= last; p++) {
      const isEdge = p === 1 || p === last;
      const isNearCurrent = Math.abs(p - current) <= 1;
      if (isEdge || isNearCurrent) {
        result.push(p);
      } else if (result[result.length - 1] !== 0) {
        result.push(0);
      }
    }
    return result;
  });

  goTo(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.page.set(page);
    }
  }
}
