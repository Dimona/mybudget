import {
    FACEBOOK_PROVIDER,
    AMAZON_PROVIDER,
    GITHUB_PROVIDER,
    GOOGLE_PROVIDER,
    INSTAGRAM_PROVIDER,
    LINKEDIN_PROVIDER
} from './constants';

console.log(process.env.FACEBOOK_APP_ID);
export default {
    [FACEBOOK_PROVIDER]: process.env.FACEBOOK_APP_ID,
    [AMAZON_PROVIDER]: process.env.AMAZON_APP_ID,
    [GITHUB_PROVIDER]: process.env.GITHUB_APP_ID,
    [GOOGLE_PROVIDER]: process.env.GOOGLE_APP_ID,
    [INSTAGRAM_PROVIDER]: process.env.INSTAGRAM_APP_ID,
    [LINKEDIN_PROVIDER]: process.env.LINKEDIN
};
