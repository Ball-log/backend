export const signUpGoogleService = async () => {
    let url = "https://accounts.google.com/o/oauth2/v2/auth";
    url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`;
    url += `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI_SIGN_UP}`;
    url += "&response_type=code";
    url += "&scope=email profile";
    return url;
};

export const signUpKakaoService = async () => {
    let url = "https://kauth.kakao.com/oauth/authorize";
    url += `?client_id=${process.env.KAKAO_CLIENT_ID}`;
    url += `&redirect_uri=${process.env.KAKAO_REDIRECT_URI_SIGN_UP}`;
    url += "&response_type=code";
    return url;
};

export const signUpNaverService = async () => {
    let url = "https://nid.naver.com/oauth2.0/authorize?response_type=code";
    url += `&client_id=${process.env.NAVER_CLIENT_ID}`;
    url += `&redirect_uri=${process.env.NAVER_REDIRECT_URI_SIGN_UP}`;
    url += "&state=test";
    return url;
};
