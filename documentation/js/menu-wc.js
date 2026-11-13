'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">paragdigm-soundbox documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
    <button type="button"
        class="search-input-clear"
        aria-label="Clear search"
        data-search-input-clear>&times;</button>
</div>
` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="architecture.html" data-type="chapter-link">
                                        <span class="icon ion-ios-git-branch"></span>Architecture
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/App.html" data-type="entity-link" >App</a>
                            </li>
                            <li class="link">
                                <a href="components/ApplicationPage.html" data-type="entity-link" >ApplicationPage</a>
                            </li>
                            <li class="link">
                                <a href="components/BadgeUi.html" data-type="entity-link" >BadgeUi</a>
                            </li>
                            <li class="link">
                                <a href="components/BreadcrumbUi.html" data-type="entity-link" >BreadcrumbUi</a>
                            </li>
                            <li class="link">
                                <a href="components/ButtonUi.html" data-type="entity-link" >ButtonUi</a>
                            </li>
                            <li class="link">
                                <a href="components/CardUi.html" data-type="entity-link" >CardUi</a>
                            </li>
                            <li class="link">
                                <a href="components/CheckboxUi.html" data-type="entity-link" >CheckboxUi</a>
                            </li>
                            <li class="link">
                                <a href="components/ComponentsExamplePage.html" data-type="entity-link" >ComponentsExamplePage</a>
                            </li>
                            <li class="link">
                                <a href="components/DialogUi.html" data-type="entity-link" >DialogUi</a>
                            </li>
                            <li class="link">
                                <a href="components/DrawerUi.html" data-type="entity-link" >DrawerUi</a>
                            </li>
                            <li class="link">
                                <a href="components/EmptyStateUi.html" data-type="entity-link" >EmptyStateUi</a>
                            </li>
                            <li class="link">
                                <a href="components/FormFieldUi.html" data-type="entity-link" >FormFieldUi</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderUi.html" data-type="entity-link" >HeaderUi</a>
                            </li>
                            <li class="link">
                                <a href="components/HomePage.html" data-type="entity-link" >HomePage</a>
                            </li>
                            <li class="link">
                                <a href="components/LayoutPage.html" data-type="entity-link" >LayoutPage</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginExamplePage.html" data-type="entity-link" >LoginExamplePage</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginPage.html" data-type="entity-link" >LoginPage</a>
                            </li>
                            <li class="link">
                                <a href="components/MainLayoutUi.html" data-type="entity-link" >MainLayoutUi</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuItemUi.html" data-type="entity-link" >MenuItemUi</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuUi.html" data-type="entity-link" >MenuUi</a>
                            </li>
                            <li class="link">
                                <a href="components/NotFoundPage.html" data-type="entity-link" >NotFoundPage</a>
                            </li>
                            <li class="link">
                                <a href="components/NotificationsExamplePage.html" data-type="entity-link" >NotificationsExamplePage</a>
                            </li>
                            <li class="link">
                                <a href="components/NotificationUi.html" data-type="entity-link" >NotificationUi</a>
                            </li>
                            <li class="link">
                                <a href="components/PaginatorUi.html" data-type="entity-link" >PaginatorUi</a>
                            </li>
                            <li class="link">
                                <a href="components/PlayerUi.html" data-type="entity-link" >PlayerUi</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductDetailExamplePage.html" data-type="entity-link" >ProductDetailExamplePage</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductEditExamplePage.html" data-type="entity-link" >ProductEditExamplePage</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductsExamplePage.html" data-type="entity-link" >ProductsExamplePage</a>
                            </li>
                            <li class="link">
                                <a href="components/SkeletonUi.html" data-type="entity-link" >SkeletonUi</a>
                            </li>
                            <li class="link">
                                <a href="components/TableUi.html" data-type="entity-link" >TableUi</a>
                            </li>
                            <li class="link">
                                <a href="components/TagUi.html" data-type="entity-link" >TagUi</a>
                            </li>
                            <li class="link">
                                <a href="components/ToastUi.html" data-type="entity-link" >ToastUi</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/Autofocus.html" data-type="entity-link" >Autofocus</a>
                                </li>
                                <li class="link">
                                    <a href="directives/Autoplay.html" data-type="entity-link" >Autoplay</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ToastService.html" data-type="entity-link" >ToastService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppNotification.html" data-type="entity-link" >AppNotification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BreadcrumbItem.html" data-type="entity-link" >BreadcrumbItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuEntry.html" data-type="entity-link" >MenuEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Toast.html" data-type="entity-link" >Toast</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToastOptions.html" data-type="entity-link" >ToastOptions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-funnel"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/SongnamePipe.html" data-type="entity-link" >SongnamePipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
