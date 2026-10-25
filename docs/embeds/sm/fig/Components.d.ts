// Components.d.ts — the complete catalog of the 91 component(s) in
// Components.bundle.js. READ THIS FILE BEFORE USING THE BUNDLE: component
// names are derived from Figma layer names (sanitized to PascalCase,
// deduplicated) and may differ from what the design calls them — the
// "figma layer" comment above each interface maps them back.
// After the bundle <script> loads, every component is a window global
// (e.g. window.Activate) and usable directly in JSX.
import * as React from 'react';

// figma layer: "Activate" (node 130:46883)
export interface ActivateProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "open" | "closed";
}

// figma layer: "Analyze" (node 130:46866)
export interface AnalyzeProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "analyze" | "closed";
}

// figma layer: "arrow-3" (node 130:2682)
export interface Arrow3Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "arrow-down" (node 130:1951)
export interface ArrowDownProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "arrow-left" (node 130:4333)
export interface ArrowLeft3Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "arrow-right" (node 130:157)
export interface ArrowRightProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "arrow-up" (node 130:1956)
export interface ArrowUpProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Badge" (node 130:1914)
export interface BadgeProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: "solid" | "subtle" | "outline";
  colorScheme?: "gray" | "blue" | "green" | "purple" | "pink" | "orange";
  /** Text content; defaults to "Label". */
  text1?: string;
}

// figma layer: "Basic flows" (node 130:67265)
export interface BasicFlowsProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "_Breadcrumb" (node 130:6846)
export interface BreadcrumbProps {
  className?: string;
  style?: React.CSSProperties;
  currentPage?: string;
  parentPage?: "none" | "1" | "2" | "3";
  parentPage1?: string;
  parentPage3?: string;
  parentPage2?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon4?: React.ReactNode;
}

// figma layer: "Button" (node 130:47042)
export interface Button16Props {
  className?: string;
  style?: React.CSSProperties;
  editCTA?: string;
  size?: "lg" | "sm";
  leftIcon?: boolean;
  editRightIcon?: React.ReactNode;
  state?: "default" | "hover" | "active" | "disabled";
  rightIcon?: boolean;
  editLeftIcon?: React.ReactNode;
  variant?: "solid" | "outline" | "ghost" | "icon only";
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Button" (node 130:47237)
export interface Button17Props {
  className?: string;
  style?: React.CSSProperties;
  editCTA?: string;
  size?: "lg" | "sm";
  leftIcon?: boolean;
  state?: "default" | "hover" | "active" | "disabled";
  instance?: React.ReactNode;
  rightIcon?: "false" | "true" | "progress";
  variant?: "solid" | "outline" | "ghost" | "icon only";
}

// figma layer: "Checkbox" (node 130:44821)
export interface Checkbox3Props {
  className?: string;
  style?: React.CSSProperties;
  selected?: "default" | "yes" | "no";
  hover?: "default" | "yes" | "no";
  indeterminate?: boolean;
  disabled?: boolean;
}

// figma layer: "Checkbox" (node 130:44846)
export interface Checkbox4Props {
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  type?: "basic" | "unstyled" | "card";
  withLogo?: boolean;
  indeterminate?: boolean;
  iconContent?: React.ReactNode;
  description?: boolean;
  showLabel?: boolean;
  hover?: boolean;
  label?: string;
  checked?: boolean;
  /** Text content; defaults to "This is your description. ". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "close" (node 130:1564)
export interface Close2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "color-swatch" (node 130:6930)
export interface ColorSwatchProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Column/Action buttons/3" (node 130:47582)
export interface ColumnActionButtons3Props {
  className?: string;
  style?: React.CSSProperties;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
}

// figma layer: "Column header" (node 130:2809)
export interface ColumnHeader2Props {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  sort?: boolean;
  sortOrder?: "none" | "ascending" | "descending";
  hover?: boolean;
  sortType?: "alphabetical" | "numerical" | "none";
  disabled?: boolean;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Column/Text" (node 130:43005)
export interface ColumnTextProps {
  className?: string;
  style?: React.CSSProperties;
  /** Text content; defaults to "Text column". */
  text1?: string;
}

// figma layer: "Text" (node 130:45274)
export interface Component4Props {
  className?: string;
  style?: React.CSSProperties;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
  isLight?: boolean;
  isBold?: boolean;
  /** Text content; defaults to "Bonbon oat cake chupa chups gummies marshmallow". */
  text1?: string;
}

// figma layer: "Connect" (node 130:46705)
export interface ConnectProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "default" | "closed";
}

// figma layer: "danger" (node 130:47457)
export interface DangerProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Data source icons" (node 130:14546)
export interface DataSourceIconsProps {
  className?: string;
  style?: React.CSSProperties;
  name?: "Facebook Political Ads" | "Google Ads" | "Azure Synapse" | "Adjust" | "Linkedin Ads" | "Adroll" | "Affluent" | "The Trade Desk" | "Clockify" | "Newsletter2Go" | "Amazon Ads" | "G2 Review" | "Glassdoor" | "IQM" | "PIWIK" | "RTB House" | "Similar Web" | "Sizmek" | "Sprout social" | "Yahoo! Japan Search Ads" | "Celtra" | "Datadog" | "Flashtalking" | "Ignite by realestate.au" | "Matomo" | "MediaMath" | "Quantacast" | "TradeDoubler" | "Trustpilot" | "Xing" | "Adtraction" | "Optimizely" | "Outbrain Amplify" | "Snapchat Marketing" | "Tripadvisor Reviews" | "Tumblr Public Data" | "Twitter Ads" | "VKontakte Public Data" | "Vimeo Public Data" | "Yahoo DSP" | "Yandex.Direct" | "Double verify" | "Impact.com" | "Piano Analytics (At Internet)" | "Rakuten Advertising" | "Adobe Analytics" | "Ahrefs" | "Apple Public Data" | "Awin" | "AppsFlyer" | "Criteo" | "Database" | "Google AdSense" | "Google Analytics 4" | "Google BigQuery" | "Google Campaign Manager 360" | "Google Display & Video 360" | "Google My Business" | "Google Play Reviews" | "Google Search Ads 360" | "Google Search Console" | "Google Sheets" | "Paypal" | "Ad data and GA" | "Bambuser" | "Campaign Monitor M" | "Indeed Reviews" | "Instagram Public Data" | "JSON" | "Klaviyo" | "LiveIntent" | "Mailchimp" | "Meltwater" | "Microsoft Ads (Bing)" | "Moz" | "Partnerize" | "Pinterest Ads" | "Quora Ads" | "Readpeak" | "Reddit Public Data" | "Salesforce" | "Searchmetrics" | "Semrush Analytics" | "Sendinblue" | "Shopify" | "Simplesat" | "Slack" | "Smarp" | "Snowflake" | "Spotify Ads" | "StackAdapt" | "Stripe" | "TEADS" | "Yelp reviews" | "Yext" | "Zemanta" | "Active Campaign" | "Adform" | "Bing Webmaster Tools" | "Capterra PPC" | "Instagram Insights" | "TikTok Ads" | "Youtube" | "Google Ad Manager" | "Google Analytics" | "Hubspot" | "Omnisend" | "Harvest" | "CallRail" | "TikTok Organic" | "LinkedIn Company Pages" | "Semrush Projects" | "Facebook Ads" | "Facebook Insights" | "Facebook Public Data" | "Facebook Billing Data" | "Yahoo! Japan Display Ads" | "Yandex.Metrica" | "Yahoo Native Ads" | "Salesforce Marketing Cloud" | "Pinterest Public Data" | "Pinterest Organic" | "Twitter Organic" | "Google Trends" | "YouTube" | "Twitter Public Data" | "Amazon DSP" | "Apple Search Ads" | "Capterra Reviews" | "Criteo Retail Media" | "Brevo" | "File import" | "Google Play Console" | "WooCommerce";
  size?: "24" | "60" | "100" | "n/a";
  dataSourceName?: "default" | "true" | "false" | "t";
  /** Text content; defaults to "Facebook Ads". */
  text1?: string;
}

// figma layer: "eye-slash" (node 130:1581)
export interface EyeSlashProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "filter" (node 130:42622)
export interface FilterProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "home" (node 130:46138)
export interface HomeProps {
  className?: string;
  style?: React.CSSProperties;
  style2?: "filled" | "outlined" | "round" | "sharp" | "two tone";
}

// figma layer: "Home" (node 130:46155)
export interface Home2Props {
  className?: string;
  style?: React.CSSProperties;
  property1?: "default" | "hover" | "active" | "selected";
  logo?: boolean;
  /** Text content; defaults to "Home". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "iconography" (node 130:43007)
export interface Iconography9Props {
  className?: string;
  style?: React.CSSProperties;
  iconStyle?: "linear" | "solid icons" | "vuesax";
  iconName?: "export" | "home" | "folder-connection" | "programming-arrows" | "people" | "tick" | "add" | "sort" | "undo" | "redo" | "close" | "rotate-left" | "rotate-right" | "refresh" | "import" | "trash" | "more" | "edit" | "copy" | "layer" | "filter" | "link" | "setting" | "play" | "shopping-cart" | "location" | "key" | "personalcard" | "magicpen" | "calendar" | "message-question" | "search-normal" | "search-zoom-in" | "search-zoom-out" | "warning-circle" | "tick-circle" | "external-link" | "add-circle" | "close-circle" | "more-circle" | "radio-default" | "checkbox-checked" | "checkbox" | "radio-selected" | "checkbox-intermediate" | "chevron-right" | "folder" | "folder-add" | "folder-cloud" | "folder-cross" | "folder-minus" | "chevron-left" | "chevron-down" | "chevron-up" | "profile-circle" | "arrow-left-right" | "arrow-right" | "arrow-left" | "arrow-up" | "arrow-down" | "caret-right" | "caret-up" | "caret-left" | "caret-down" | "info" | "share" | "transform" | "profile-2user" | "pause" | "danger" | "repeat-circle" | "timer";
  iconSize?: "24" | "16" | "12";
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Icons" (node 130:46225)
export interface Icons2Props {
  className?: string;
  style?: React.CSSProperties;
  name?: "data sources" | "custom data sources" | "support" | "capi" | "destinations" | "dashboards" | "gs" | "api" | "table manager" | "storage" | "custom fields" | "data transfers" | "data blending" | "power bi" | "lookerstudio" | "excel" | "team" | "data explorer" | "settings";
  state?: "off" | "on";
}

// figma layer: "info-circle" (node 130:1568)
export interface InfoCircleProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Input" (node 130:1600)
export interface InputProps {
  className?: string;
  style?: React.CSSProperties;
  placeholderText?: string;
  inputText?: string;
  label?: boolean;
  labelText?: string;
  isRequired?: boolean;
  captionText?: string;
  caption?: boolean;
  inputLeftElement?: boolean;
  state?: "empty" | "hover" | "active / typing" | "active / empty" | "active / selected" | "filled";
  inputRightElement?: boolean;
  isDisabled?: boolean;
  infoIcon?: boolean;
  size?: "lg" | "md" | "sm";
  errorText?: string;
  isInvalid?: boolean;
  /** Text content; defaults to "*". */
  text1?: string;
  /** Text content; defaults to "This is a caption". */
  text2?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon4?: React.ReactNode;
}

// figma layer: "Manage" (node 130:46842)
export interface ManageProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "open" | "closed";
}

// figma layer: "Menu / item" (node 130:47546)
export interface MenuItem4Props {
  className?: string;
  style?: React.CSSProperties;
  isSelected?: boolean;
  state?: "default" | "hover" | "pressed" | "disabled";
  hasIcon?: boolean;
  isGroupName?: boolean;
  isDivider?: boolean;
  /** Text content; defaults to "First item". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
}

// figma layer: "more-square" (node 130:47574)
export interface MoreSquareProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Navigation item" (node 130:46668)
export interface NavigationItem2Props {
  className?: string;
  style?: React.CSSProperties;
  property1?: "default" | "hover" | "active" | "selected";
  text?: string;
  collapsed?: "false";
  showMore?: boolean;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "new Button" (node 130:43860)
export interface NewButton4Props {
  className?: string;
  style?: React.CSSProperties;
  focus?: boolean;
  size?: "lg" | "sm" | "xs" | "md";
  editCTA?: string;
  disabled?: boolean;
  danger?: boolean;
  leftIcon?: boolean;
  editRightIcon?: React.ReactNode;
  state?: "default" | "hover" | "active" | "disabled";
  editLeftIcon?: React.ReactNode;
  rightIcon?: boolean;
  variant?: "solid" | "outline" | "ghost" | "icon only" | "secondary";
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Pagination" (node 130:4339)
export interface PaginationProps {
  className?: string;
  style?: React.CSSProperties;
  page?: string;
  state?: "default" | "hover" | "active" | "disabled";
  item?: "left" | "page" | "right" | "...";
  /** Text content; defaults to "...". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Pagination" (node 130:46956)
export interface Pagination4Props {
  className?: string;
  style?: React.CSSProperties;
  page?: string;
  state?: "default" | "hover" | "active" | "disabled";
  item?: "left" | "page" | "right" | "...";
  /** Text content; defaults to "...". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Pagination" (node 130:46999)
export interface Pagination5Props {
  className?: string;
  style?: React.CSSProperties;
  pages?: "no" | "5" | "15 first active" | "15 middle active" | "15 last active";
  /** Text content; defaults to "Results: 6". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Pagination group" (node 130:4370)
export interface PaginationGroupProps {
  className?: string;
  style?: React.CSSProperties;
  showNumbers?: boolean;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon4?: React.ReactNode;
}

// figma layer: "Pagination group" (node 130:46987)
export interface PaginationGroup3Props {
  className?: string;
  style?: React.CSSProperties;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon4?: React.ReactNode;
}

// figma layer: "Scaling Data source icons - alphabetised" (node 130:2861)
export interface ScalingDataSourceIconsAlphabetisedProps {
  className?: string;
  style?: React.CSSProperties;
  dataSource?: "no icon (default)" | "facebook ads" | "google ads" | "google analytics" | "instagram insights" | "linkedin ads" | "tiktok ads" | "youtube" | "active campaign" | "adobe commerce" | "adroll" | "adform" | "adjust" | "adobe analytics" | "adobe analytics 2.0" | "adtraction" | "affluent" | "ahrefs" | "apple public data" | "apple search ads" | "appsflyer" | "awin" | "azure synapse" | "bing webmaster tools" | "callrail" | "capterra ppc" | "capterra reviews" | "clockify" | "criteo" | "database" | "facebook billing data" | "facebook insights" | "facebook political ads" | "facebook public data" | "google" | "google ad manager" | "google adsense" | "google analytics 4" | "google bigquery" | "google display & video 360" | "google campaign manager 360" | "google my business" | "google play reviews" | "google search ads 360" | "google search console" | "google sheets" | "google trends" | "harvest" | "hubspot" | "indeed reviews" | "instagram public data" | "klaviyo" | "linkedin company pages" | "liveintent" | "mailchimp" | "microsoft ads (bing)" | "moz" | "newsletter2go" | "omnisend" | "optimizely" | "outbrain amplify" | "pardot" | "paypal" | "pinterest ads" | "pinterest organic" | "pinterest public data" | "quora ads" | "readpeak" | "reddit public data" | "salesforce" | "salesforce marketing cloud" | "searchmetrics" | "semrush analytics" | "semrush projects" | "sendinblue" | "shopify" | "simplesat" | "slack" | "smarp" | "snapchat marketing" | "snowflake" | "spotify ads" | "stackadapt" | "stripe" | "taboola" | "the trade desk" | "tripadvisor reviews" | "tumblr public data" | "twitter ads" | "twitter premium" | "twitter public data" | "vkontakte public data" | "vimeo public data" | "yahoo dsp" | "yahoo native ads" | "yandex.direct" | "yandex.metrica" | "yelp reviews" | "yext" | "partnerize" | "bambuser" | "blend connector" | "json" | "zemanta" | "meltwater" | "teads" | "ad data and ga" | "campaign monitor" | "campaign monitor m" | "amazon dsp" | "yahoo japan" | "yahoo japan y" | "amazon dsp a" | "sprout social" | "similar web" | "iqm" | "rtb house" | "sizmek" | "piwik" | "g2 review" | "glassdoor" | "rakuten advertising" | "double verify" | "piano analytics (at internet)" | "quantacast" | "matomo" | "datadog" | "celtra" | "ignite by realestate.au" | "trustpilot" | "xing" | "mediamath" | "tradedoubler" | "flashtalking" | "everflow" | "mixpanel" | "basis" | "nexx" | "google merchant center" | "data source icons" | "pipedrive" | "zoho crm" | "bigcommerce";
}

// figma layer: "Scaling Data source icons - alphabteised" (node 130:40236)
export interface ScalingDataSourceIconsAlphabteisedProps {
  className?: string;
  style?: React.CSSProperties;
  dataSource?: "awin" | "active campaign" | "ad data and ga" | "adform" | "adjust" | "adobe analytics" | "adobe analytics 2.0" | "adroll" | "adtraction" | "affluent" | "ahrefs" | "amazon dsp" | "amazon dsp a" | "apple public data" | "apple search ads" | "appsflyer" | "azure synapse" | "bambuser" | "basis" | "bing webmaster tools" | "blend connector" | "callrail" | "campaign monitor" | "campaign monitor m" | "capterra ppc" | "capterra reviews" | "celtra" | "clockify" | "criteo" | "database" | "datadog" | "double verify" | "everflow" | "facebook ads" | "facebook billing data" | "facebook insights" | "facebook political ads" | "facebook public data" | "flashtalking" | "g2 review" | "glassdoor" | "google ad manager" | "google adsense" | "google ads" | "google analytics" | "google analytics 4" | "google bigquery" | "google campaign manager 360" | "google display & video 360" | "google merchant center" | "google my business" | "google play reviews" | "google search ads 360" | "google search console" | "google sheets" | "google trends" | "harvest" | "hubspot" | "iqm" | "ignite by realestate.au" | "indeed reviews" | "instagram insights" | "instagram public data" | "json" | "klaviyo" | "linkedin ads" | "linkedin company pages" | "liveintent" | "mailchimp" | "matomo" | "mediamath" | "meltwater" | "microsoft ads (bing)" | "mixpanel" | "moz" | "nexx" | "newsletter2go" | "no icon (default)" | "omnisend" | "optimizely" | "outbrain amplify" | "piwik" | "pardot" | "partnerize" | "paypal" | "piano analytics (at internet)" | "pinterest ads" | "pinterest organic" | "pinterest public data" | "quantacast" | "quora ads" | "rtb house" | "rakuten advertising" | "readpeak" | "reddit public data" | "salesforce" | "salesforce marketing cloud" | "searchmetrics" | "semrush analytics" | "semrush projects" | "sendinblue" | "shopify" | "similar web" | "simplesat" | "sizmek" | "slack" | "smarp" | "snapchat marketing" | "snowflake" | "spotify ads" | "sprout social" | "stackadapt" | "stripe" | "teads" | "taboola" | "the trade desk" | "tiktok ads" | "tradedoubler" | "tripadvisor reviews" | "trustpilot" | "tumblr public data" | "twitter ads" | "twitter premium" | "twitter public data" | "vkontakte public data" | "vimeo public data" | "xing" | "yahoo dsp" | "yahoo japan" | "yahoo japan y" | "yahoo native ads" | "yandex.direct" | "yandex.metrica" | "yelp reviews" | "yext" | "youtube" | "zemanta";
}

// figma layer: "search-normal" (node 130:1575)
export interface SearchNormalProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "section" (node 130:47539)
export interface Section2Props {
  className?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  /** Text content; defaults to "Large". */
  text1?: string;
}

// figma layer: "Section title" (node 130:46188)
export interface SectionTitleProps {
  className?: string;
  style?: React.CSSProperties;
  text?: string;
  property1?: "open default" | "open hover" | "closed default" | "closed hover";
  open?: boolean;
  collapsed?: "false";
  hover?: boolean;
}

// figma layer: "Select" (node 130:1961)
export interface SelectProps {
  className?: string;
  style?: React.CSSProperties;
  leftElement?: boolean;
  showBadge?: boolean;
  state?: "selected" | "active / selected" | "hover / selection";
  size?: "lg" | "sm" | "md";
  type?: "multi" | "single";
  /** Text content; defaults to "Filter label". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
}

// figma layer: "Select" (node 130:4167)
export interface Select2Props {
  className?: string;
  style?: React.CSSProperties;
  placeholderText?: string;
  label?: boolean;
  isRequired?: boolean;
  caption?: boolean;
  leftElement?: boolean;
  inputText?: string;
  labelText?: string;
  captionText?: string;
  state?: "empty" | "hover" | "selected" | "active / no selection" | "active / selected" | "hover / selection";
  isDisabled?: boolean;
  size?: "md" | "sm";
  isInvalid?: boolean;
  /** Text content; defaults to "*". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
}

// figma layer: "Select" (node 130:48489)
export interface Select6Props {
  className?: string;
  style?: React.CSSProperties;
  /** Text content; defaults to "Google Campaign Manager 360 ". */
  text1?: string;
  /** Text content; defaults to "jaylon.rosser@supermetrics.com". */
  text2?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
}

// figma layer: "Side navigation" (node 130:48625)
export interface SideNavigation2Props {
  className?: string;
  style?: React.CSSProperties;
  activePage?: "home" | "data sources" | "transform (landing)" | "data blending" | "custom fields" | "storage (landing)" | "storage destinations" | "table manager" | "transfers" | "moniitoring" | "destinations (landing)" | "google sheets" | "looker studio" | "monday.com" | "microsoft excel" | "power bi" | "api";
  expanded?: boolean;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
}

// figma layer: "_Side navigation / API button" (node 130:48618)
export interface SideNavigationAPIButtonProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "selected" | "default" | "hover";
}

// figma layer: "_Side navigation / Button" (node 130:6712)
export interface SideNavigationButtonProps {
  className?: string;
  style?: React.CSSProperties;
  showLabel?: boolean;
  isActive?: boolean;
  onHover?: "false" | "true" | "arrow" | "parent" | "all";
  isExpanded?: boolean;
  type?: "single" | "group" | "icon only";
  /** Text content; defaults to "Home". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
}

// figma layer: "_Side navigation / Child item" (node 130:6707)
export interface SideNavigationChildItemProps {
  className?: string;
  style?: React.CSSProperties;
  isActive?: boolean;
  /** Text content; defaults to "Google Sheets". */
  text1?: string;
}

// figma layer: "_Side navigation / Data sources button" (node 130:48517)
export interface SideNavigationDataSourcesButtonProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "selected" | "default" | "hover";
}

// figma layer: "_Side navigation / Destinations button" (node 130:48589)
export interface SideNavigationDestinationsButtonProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "expanded" | "default" | "hover" | "active";
  selection?: "none" | "google sheets" | "looker studio" | "microsoft excel" | "monday.com" | "power bi";
}

// figma layer: "_Side navigation / Home button" (node 130:48501)
export interface SideNavigationHomeButtonProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "selected" | "default" | "hover";
}

// figma layer: "_Side navigation / Storage button" (node 130:48565)
export interface SideNavigationStorageButtonProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "expanded" | "default" | "hover" | "active";
  selection?: "none" | "table manager" | "monitoring" | "storage destinations" | "transfers";
}

// figma layer: "_Side navigation / Transform button" (node 130:48540)
export interface SideNavigationTransformButtonProps {
  className?: string;
  style?: React.CSSProperties;
  state?: "expanded" | "default" | "hover" | "active";
  selection?: "none" | "data blending" | "custom fields";
}

// figma layer: "Skeleton/Basic" (node 130:39048)
export interface SkeletonBasicProps {
  className?: string;
  style?: React.CSSProperties;
  loading?: "1" | "2";
}

// figma layer: "sort" (node 130:2807)
export interface Sort2Props {
  className?: string;
  style?: React.CSSProperties;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "sort-alphabetical-ascending" (node 130:2708)
export interface SortAlphabeticalAscendingProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "sort-alphabetical-descending" (node 130:2736)
export interface SortAlphabeticalDescendingProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "sort-ascending" (node 130:2703)
export interface SortAscendingProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "sort-descending" (node 130:2731)
export interface SortDescendingProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "sort-numerical-ascending" (node 130:2720)
export interface SortNumericalAscendingProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "sort-numerical-descending" (node 130:2748)
export interface SortNumericalDescendingProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Spinner" (node 130:39415)
export interface SpinnerProps {
  className?: string;
  style?: React.CSSProperties;
  size?: "s" | "l";
  percentage?: string;
  showPercentage?: boolean;
  animate?: "1" | "2" | "3";
  onBackground?: "light" | "dark";
}

// figma layer: "Supermetrics Logo" (node 130:6686)
export interface SupermetricsLogoProps {
  className?: string;
  style?: React.CSSProperties;
  hasName?: boolean;
}

// figma layer: "Supermetrics Logo" (node 130:20604)
export interface SupermetricsLogo2Props {
  className?: string;
  style?: React.CSSProperties;
  hasName?: boolean;
  newBrand?: boolean;
}

// figma layer: "Tag" (node 130:43649)
export interface Tag5Props {
  className?: string;
  style?: React.CSSProperties;
  colorScheme?: "yellow" | "orange" | "grey" | "green" | "blue" | "purple" | "pink";
  icon?: "no" | "left" | "right";
  closeButton?: boolean;
  /** Text content; defaults to "Status". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
}

// figma layer: "tag" (node 130:45268)
export interface Tag6Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Tags close button" (node 130:43585)
export interface TagsCloseButton3Props {
  className?: string;
  style?: React.CSSProperties;
  state?: "default" | "hover" | "pressed";
  colour?: "default" | "green" | "yellow" | "orange" | "blue" | "purple" | "pink";
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Team switcher" (node 130:46118)
export interface TeamSwitcherProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "02" | "active" | "hover";
  /** Text content; defaults to "Mosaic Mindset Media". */
  text1?: string;
}

// figma layer: "tick-circle" (node 130:47450)
export interface TickCircleProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Toasts" (node 130:47464)
export interface ToastsProps {
  className?: string;
  style?: React.CSSProperties;
  button?: React.ReactNode;
  statues?: "warning" | "error" | "info" | "success";
  showButton?: boolean;
  closeButton?: boolean;
  withTitle?: boolean;
  /** Text content; defaults to "Title of the issue". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
}

// figma layer: "Top bar" (node 130:66489)
export interface TopBar2Props {
  className?: string;
  style?: React.CSSProperties;
  /** Text content; defaults to "Refresh accounts". */
  text1?: string;
}

// figma layer: "vuesax/linear/arrow-down" (node 130:4149)
export interface VuesaxLinearArrowDownProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "vuesax/linear/arrow-right" (node 130:6451)
export interface VuesaxLinearArrowRightProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "vuesax/linear/arrow-up" (node 130:4154)
export interface VuesaxLinearArrowUpProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "vuesax/linear/copy" (node 130:165)
export interface VuesaxLinearCopyProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "vuesax/linear/data" (node 130:48608)
export interface VuesaxLinearDataProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "vuesax/linear/driver" (node 130:48553)
export interface VuesaxLinearDriverProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "vuesax/linear/export" (node 130:48582)
export interface VuesaxLinearExportProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "vuesax/linear/hierarchy-2" (node 130:48508)
export interface VuesaxLinearHierarchy2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "vuesax/linear/home" (node 130:6700)
export interface VuesaxLinearHomeProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "vuesax/linear/search-normal" (node 130:4143)
export interface VuesaxLinearSearchNormalProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "vuesax/linear/tick" (node 130:42589)
export interface VuesaxLinearTick2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "vuesax/linear/transform" (node 130:48524)
export interface VuesaxLinearTransformProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "vuesax/linear/trash" (node 130:41489)
export interface VuesaxLinearTrash2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "vuesax/linear/warning-circle" (node 130:4160)
export interface VuesaxLinearWarningCircleProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "warning-circle" (node 130:1593)
export interface WarningCircleProps {
  className?: string;
  style?: React.CSSProperties;
}

declare const Activate: React.FC<ActivateProps>;
declare const Analyze: React.FC<AnalyzeProps>;
declare const Arrow3: React.FC<Arrow3Props>;
declare const ArrowDown: React.FC<ArrowDownProps>;
declare const ArrowLeft3: React.FC<ArrowLeft3Props>;
declare const ArrowRight: React.FC<ArrowRightProps>;
declare const ArrowUp: React.FC<ArrowUpProps>;
declare const Badge: React.FC<BadgeProps>;
declare const BasicFlows: React.FC<BasicFlowsProps>;
declare const Breadcrumb: React.FC<BreadcrumbProps>;
declare const Button16: React.FC<Button16Props>;
declare const Button17: React.FC<Button17Props>;
declare const Checkbox3: React.FC<Checkbox3Props>;
declare const Checkbox4: React.FC<Checkbox4Props>;
declare const Close2: React.FC<Close2Props>;
declare const ColorSwatch: React.FC<ColorSwatchProps>;
declare const ColumnActionButtons3: React.FC<ColumnActionButtons3Props>;
declare const ColumnHeader2: React.FC<ColumnHeader2Props>;
declare const ColumnText: React.FC<ColumnTextProps>;
declare const Component4: React.FC<Component4Props>;
declare const Connect: React.FC<ConnectProps>;
declare const Danger: React.FC<DangerProps>;
declare const DataSourceIcons: React.FC<DataSourceIconsProps>;
declare const EyeSlash: React.FC<EyeSlashProps>;
declare const Filter: React.FC<FilterProps>;
declare const Home: React.FC<HomeProps>;
declare const Home2: React.FC<Home2Props>;
declare const Iconography9: React.FC<Iconography9Props>;
declare const Icons2: React.FC<Icons2Props>;
declare const InfoCircle: React.FC<InfoCircleProps>;
declare const Input: React.FC<InputProps>;
declare const Manage: React.FC<ManageProps>;
declare const MenuItem4: React.FC<MenuItem4Props>;
declare const MoreSquare: React.FC<MoreSquareProps>;
declare const NavigationItem2: React.FC<NavigationItem2Props>;
declare const NewButton4: React.FC<NewButton4Props>;
declare const Pagination: React.FC<PaginationProps>;
declare const Pagination4: React.FC<Pagination4Props>;
declare const Pagination5: React.FC<Pagination5Props>;
declare const PaginationGroup: React.FC<PaginationGroupProps>;
declare const PaginationGroup3: React.FC<PaginationGroup3Props>;
declare const ScalingDataSourceIconsAlphabetised: React.FC<ScalingDataSourceIconsAlphabetisedProps>;
declare const ScalingDataSourceIconsAlphabteised: React.FC<ScalingDataSourceIconsAlphabteisedProps>;
declare const SearchNormal: React.FC<SearchNormalProps>;
declare const Section2: React.FC<Section2Props>;
declare const SectionTitle: React.FC<SectionTitleProps>;
declare const Select: React.FC<SelectProps>;
declare const Select2: React.FC<Select2Props>;
declare const Select6: React.FC<Select6Props>;
declare const SideNavigation2: React.FC<SideNavigation2Props>;
declare const SideNavigationAPIButton: React.FC<SideNavigationAPIButtonProps>;
declare const SideNavigationButton: React.FC<SideNavigationButtonProps>;
declare const SideNavigationChildItem: React.FC<SideNavigationChildItemProps>;
declare const SideNavigationDataSourcesButton: React.FC<SideNavigationDataSourcesButtonProps>;
declare const SideNavigationDestinationsButton: React.FC<SideNavigationDestinationsButtonProps>;
declare const SideNavigationHomeButton: React.FC<SideNavigationHomeButtonProps>;
declare const SideNavigationStorageButton: React.FC<SideNavigationStorageButtonProps>;
declare const SideNavigationTransformButton: React.FC<SideNavigationTransformButtonProps>;
declare const SkeletonBasic: React.FC<SkeletonBasicProps>;
declare const Sort2: React.FC<Sort2Props>;
declare const SortAlphabeticalAscending: React.FC<SortAlphabeticalAscendingProps>;
declare const SortAlphabeticalDescending: React.FC<SortAlphabeticalDescendingProps>;
declare const SortAscending: React.FC<SortAscendingProps>;
declare const SortDescending: React.FC<SortDescendingProps>;
declare const SortNumericalAscending: React.FC<SortNumericalAscendingProps>;
declare const SortNumericalDescending: React.FC<SortNumericalDescendingProps>;
declare const Spinner: React.FC<SpinnerProps>;
declare const SupermetricsLogo: React.FC<SupermetricsLogoProps>;
declare const SupermetricsLogo2: React.FC<SupermetricsLogo2Props>;
declare const Tag5: React.FC<Tag5Props>;
declare const Tag6: React.FC<Tag6Props>;
declare const TagsCloseButton3: React.FC<TagsCloseButton3Props>;
declare const TeamSwitcher: React.FC<TeamSwitcherProps>;
declare const TickCircle: React.FC<TickCircleProps>;
declare const Toasts: React.FC<ToastsProps>;
declare const TopBar2: React.FC<TopBar2Props>;
declare const VuesaxLinearArrowDown: React.FC<VuesaxLinearArrowDownProps>;
declare const VuesaxLinearArrowRight: React.FC<VuesaxLinearArrowRightProps>;
declare const VuesaxLinearArrowUp: React.FC<VuesaxLinearArrowUpProps>;
declare const VuesaxLinearCopy: React.FC<VuesaxLinearCopyProps>;
declare const VuesaxLinearData: React.FC<VuesaxLinearDataProps>;
declare const VuesaxLinearDriver: React.FC<VuesaxLinearDriverProps>;
declare const VuesaxLinearExport: React.FC<VuesaxLinearExportProps>;
declare const VuesaxLinearHierarchy2: React.FC<VuesaxLinearHierarchy2Props>;
declare const VuesaxLinearHome: React.FC<VuesaxLinearHomeProps>;
declare const VuesaxLinearSearchNormal: React.FC<VuesaxLinearSearchNormalProps>;
declare const VuesaxLinearTick2: React.FC<VuesaxLinearTick2Props>;
declare const VuesaxLinearTransform: React.FC<VuesaxLinearTransformProps>;
declare const VuesaxLinearTrash2: React.FC<VuesaxLinearTrash2Props>;
declare const VuesaxLinearWarningCircle: React.FC<VuesaxLinearWarningCircleProps>;
declare const WarningCircle: React.FC<WarningCircleProps>;
declare global {
  interface Window {
    Activate: React.FC<ActivateProps>;
    Analyze: React.FC<AnalyzeProps>;
    Arrow3: React.FC<Arrow3Props>;
    ArrowDown: React.FC<ArrowDownProps>;
    ArrowLeft3: React.FC<ArrowLeft3Props>;
    ArrowRight: React.FC<ArrowRightProps>;
    ArrowUp: React.FC<ArrowUpProps>;
    Badge: React.FC<BadgeProps>;
    BasicFlows: React.FC<BasicFlowsProps>;
    Breadcrumb: React.FC<BreadcrumbProps>;
    Button16: React.FC<Button16Props>;
    Button17: React.FC<Button17Props>;
    Checkbox3: React.FC<Checkbox3Props>;
    Checkbox4: React.FC<Checkbox4Props>;
    Close2: React.FC<Close2Props>;
    ColorSwatch: React.FC<ColorSwatchProps>;
    ColumnActionButtons3: React.FC<ColumnActionButtons3Props>;
    ColumnHeader2: React.FC<ColumnHeader2Props>;
    ColumnText: React.FC<ColumnTextProps>;
    Component4: React.FC<Component4Props>;
    Connect: React.FC<ConnectProps>;
    Danger: React.FC<DangerProps>;
    DataSourceIcons: React.FC<DataSourceIconsProps>;
    EyeSlash: React.FC<EyeSlashProps>;
    Filter: React.FC<FilterProps>;
    Home: React.FC<HomeProps>;
    Home2: React.FC<Home2Props>;
    Iconography9: React.FC<Iconography9Props>;
    Icons2: React.FC<Icons2Props>;
    InfoCircle: React.FC<InfoCircleProps>;
    Input: React.FC<InputProps>;
    Manage: React.FC<ManageProps>;
    MenuItem4: React.FC<MenuItem4Props>;
    MoreSquare: React.FC<MoreSquareProps>;
    NavigationItem2: React.FC<NavigationItem2Props>;
    NewButton4: React.FC<NewButton4Props>;
    Pagination: React.FC<PaginationProps>;
    Pagination4: React.FC<Pagination4Props>;
    Pagination5: React.FC<Pagination5Props>;
    PaginationGroup: React.FC<PaginationGroupProps>;
    PaginationGroup3: React.FC<PaginationGroup3Props>;
    ScalingDataSourceIconsAlphabetised: React.FC<ScalingDataSourceIconsAlphabetisedProps>;
    ScalingDataSourceIconsAlphabteised: React.FC<ScalingDataSourceIconsAlphabteisedProps>;
    SearchNormal: React.FC<SearchNormalProps>;
    Section2: React.FC<Section2Props>;
    SectionTitle: React.FC<SectionTitleProps>;
    Select: React.FC<SelectProps>;
    Select2: React.FC<Select2Props>;
    Select6: React.FC<Select6Props>;
    SideNavigation2: React.FC<SideNavigation2Props>;
    SideNavigationAPIButton: React.FC<SideNavigationAPIButtonProps>;
    SideNavigationButton: React.FC<SideNavigationButtonProps>;
    SideNavigationChildItem: React.FC<SideNavigationChildItemProps>;
    SideNavigationDataSourcesButton: React.FC<SideNavigationDataSourcesButtonProps>;
    SideNavigationDestinationsButton: React.FC<SideNavigationDestinationsButtonProps>;
    SideNavigationHomeButton: React.FC<SideNavigationHomeButtonProps>;
    SideNavigationStorageButton: React.FC<SideNavigationStorageButtonProps>;
    SideNavigationTransformButton: React.FC<SideNavigationTransformButtonProps>;
    SkeletonBasic: React.FC<SkeletonBasicProps>;
    Sort2: React.FC<Sort2Props>;
    SortAlphabeticalAscending: React.FC<SortAlphabeticalAscendingProps>;
    SortAlphabeticalDescending: React.FC<SortAlphabeticalDescendingProps>;
    SortAscending: React.FC<SortAscendingProps>;
    SortDescending: React.FC<SortDescendingProps>;
    SortNumericalAscending: React.FC<SortNumericalAscendingProps>;
    SortNumericalDescending: React.FC<SortNumericalDescendingProps>;
    Spinner: React.FC<SpinnerProps>;
    SupermetricsLogo: React.FC<SupermetricsLogoProps>;
    SupermetricsLogo2: React.FC<SupermetricsLogo2Props>;
    Tag5: React.FC<Tag5Props>;
    Tag6: React.FC<Tag6Props>;
    TagsCloseButton3: React.FC<TagsCloseButton3Props>;
    TeamSwitcher: React.FC<TeamSwitcherProps>;
    TickCircle: React.FC<TickCircleProps>;
    Toasts: React.FC<ToastsProps>;
    TopBar2: React.FC<TopBar2Props>;
    VuesaxLinearArrowDown: React.FC<VuesaxLinearArrowDownProps>;
    VuesaxLinearArrowRight: React.FC<VuesaxLinearArrowRightProps>;
    VuesaxLinearArrowUp: React.FC<VuesaxLinearArrowUpProps>;
    VuesaxLinearCopy: React.FC<VuesaxLinearCopyProps>;
    VuesaxLinearData: React.FC<VuesaxLinearDataProps>;
    VuesaxLinearDriver: React.FC<VuesaxLinearDriverProps>;
    VuesaxLinearExport: React.FC<VuesaxLinearExportProps>;
    VuesaxLinearHierarchy2: React.FC<VuesaxLinearHierarchy2Props>;
    VuesaxLinearHome: React.FC<VuesaxLinearHomeProps>;
    VuesaxLinearSearchNormal: React.FC<VuesaxLinearSearchNormalProps>;
    VuesaxLinearTick2: React.FC<VuesaxLinearTick2Props>;
    VuesaxLinearTransform: React.FC<VuesaxLinearTransformProps>;
    VuesaxLinearTrash2: React.FC<VuesaxLinearTrash2Props>;
    VuesaxLinearWarningCircle: React.FC<VuesaxLinearWarningCircleProps>;
    WarningCircle: React.FC<WarningCircleProps>;
  }
}
