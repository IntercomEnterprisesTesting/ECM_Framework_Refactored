/* eslint-disable max-len */
export default class SearchPage {
    static readonly SIDE_MENU_BUTTON = '//div[@data-dojo-attach-point="featureList" and @class="bannerFeatureList"]';
    static readonly BROWSE_BUTTON = '//tr[@role="menuitem" and @aria-label="Browse "]';
    static readonly ADD_DOCUMENT_BUTTON = '//div[@aria-label="Browse Content List"]//span[@class="dijitReset dijitInline dijitButtonText" and text()="Add Document"]';
    static readonly PROFILE_MENU_BUTTON = '//span[contains(@title,"User session for")]';
    static readonly LOGOUT_BUTTON = '//td[contains(text(),"Log Out")]';
    static readonly CONFIRM_LOGOUT_BUTTON = '//span[@role="button"]//span[text()="Log Out"]';
    static readonly PROPERTIES_BUTTON = '//table[contains(@class,"dijitMenuActive")]//td[text()="Properties"]';
    static readonly SELECT_ALL_CHECKBOX = `//div[@class="dijitStackContainerChildWrapper dijitVisible" and @aria-label = "Browse"]//span[@role = "checkbox"]`;
    static readonly ACTIONS_MENU_BUTTON = `//div[contains(@widgetid, "ecm_widget_Toolbar") and @aria-label = "ContentListToolbar"]//span[text()="Actions"]`;
    static readonly ADD_DOCUMENT_WINDOW_DIV = `//div[@aria-label="Add Document"]`;
    static readonly FOLDER_IS_EMPTY_ALERT = `//div[@role="alert" and text()="The folder is empty."]`;
    static readonly CHECK_OUT_BUTTON = '//table[contains(@class,"dijitMenuActive")]//td[text()="Check Out"]';
    static readonly CHECK_OUT_ONLY_BUTTON = '//table[contains(@class,"dijitMenuActive")]//td[text()="Check Out Only"]';
    static readonly CHECK_IN_BUTTON = '//table[contains(@class,"dijitMenuActive")]//td[text()="Check In"]';
    static readonly CHECK_OUT_ICON = `//img[@class="ecmStatusIcon ecmLockIcon "]`;
    static readonly SIDE_MENU_SEARCH_BUTTON = `//tr[@role="menuitem" and @aria-label="Search "]`;
    static readonly SEARCH_FIELD = `//input[@title="Search name contains"]`;
    static readonly ALL_SEARCHES_SIDE_MENU_BUTTON = `//span[text()="All Searches"]`;
    static readonly SEARCH_BUTTON = `//div[@class="searchToggleArea"]//span[text()="Search"]`;
    static readonly SEARCH_CRITERIA_SELECTOR = "Search Criteria:";
    static readonly SELECT_OPERATOR_SELECTOR = `//input[@title="Select an operator"][1]`;
}
