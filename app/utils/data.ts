import { contentfulConfig } from "../config/contentful";
import { Theme } from "./enums";
import { ContentFulInfo, Themes } from "./types";

export const themes: Themes = [Theme.DARK, Theme.LIGHT];

export const contentful: ContentFulInfo = contentfulConfig;
