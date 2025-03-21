import TestConstants from "@uiConstants/TestConstants";
/* eslint-disable max-len */
export default class HomePage {
    static readonly FEATURES_MENU = '//div[@aria-label="Features menu"]';
    static readonly FAVOURITES_BUTTON = '//div[@role="tree" and @aria-label="Favorites Tree"]';
    static readonly OPENED_SIDE_MENU = '//nav[@class="featureListPane"]';
    static readonly SIDE_MENU_BUTTON = '//div[@data-dojo-attach-point="featureList" and @class="bannerFeatureList"]';
    static readonly BROWSE_BUTTON = '//tr[@role="menuitem" and @aria-label="Browse "]';
    static readonly ADD_DOCUMENT_BUTTON = '//div[@aria-label="Browse Content List"]//span[@class="dijitReset dijitInline dijitButtonText" and text()="Add Document"]';
    static readonly CONFIRM_LOGOUT_BUTTON = '//span[@role="button"]//span[text()="Log Out"]';
    static readonly PROPERTIES_BUTTON = '//table[contains(@class,"dijitMenuActive")]//td[text()="Properties"]';
    static readonly SELECT_ALL_CHECKBOX = `//div[@class="dijitStackContainerChildWrapper dijitVisible" and @aria-label = "Browse"]//span[@role = "checkbox"]`;
    static readonly ACTIONS_MENU_BUTTON = `//div[contains(@widgetid, "ecm_widget_Toolbar") and @aria-label = "ContentListToolbar"]//span[text()="Actions"]`;
    static readonly PROPERTIES_WINDOW_DIV = `//div[@aria-label="Properties" and @aria-hidden="false"]`;
    static readonly ADD_DOCUMENT_WINDOWS_DIV = `//div[@aria-label="Add Document"]`;
    static readonly FOLDER_IS_EMPTY_TEXT = `//div[@role="alert" and text()="The folder is empty."]`;
    static readonly CHECK_OUT_BUTTON = '//table[contains(@class,"dijitMenuActive")]//td[text()="Check Out"]';
    static readonly CHECK_OUT_ONLY_BUTTON = '//table[contains(@class,"dijitMenuActive")]//td[text()="Check Out Only"]';
    static readonly CHECK_IN_BUTTON = '//table[contains(@class,"dijitMenuActive")]//td[text()="Check In"]';
    static readonly CHECK_OUT_IMG = `//img[@class="ecmStatusIcon ecmLockIcon "]`;
    static readonly SEARCH_BUTTON = `//tr[@role="menuitem" and @aria-label="Search "]`;
    static readonly SEARCH_TEXTBOX = `//input[@title="Search name contains"]`;
    static readonly ACTION_MENU = `//table[contains(@class,"dijitMenuActive")]`;
    static readonly DELETE_BUTTON = '//table[contains(@class,"dijitMenuActive")]//td[text()="Delete"]';
    static readonly CONFIRM_DELETE_BUTTON = `//span[contains(@id,"ecm_widget_Button") and text()="Delete"]`;
    static readonly PROFILE_MENU_BUTTON = '//span[contains(@title,"User session for")]';
    static readonly LOGOUT_BUTTON = '//td[contains(text(),"Log Out")]';
    static readonly PROPERTIES_MENU_BUTTON = '//table[contains(@class,"dijitMenuActive")]//td[text()="Properties"]';
    static readonly TEST_FILE_SELECTOR = `//a[@class="anchorLink" and text() ='${TestConstants.TEST_FILE_NAME}']`;
    static readonly TOTAL_COUNT = `//span[@class="totalCount"]`;
    static readonly SIDE_MENU_LOADED = `//div[contains(@class,"dijitTreeNodeLoaded")]`;
    static readonly EDIT_BTN = `//a[@title="Edit"]`;
    static readonly PROPERTIES_DIV = `//div[@class="editPropertiesLinkAction"]`;
    static readonly PROPERTIES_DIV_BTN = `//div[@title="Restore Section" and @zn_id]`;
}
