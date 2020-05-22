const webConfig = Object.freeze({

    /*图片服务器*/
    apiResourceHost: process.env.VUE_APP_API_RESOURCE_HOST,
    apiResourceUpload: "/upload",
    apiResourceG: "/g",
    apiHost: process.env.VUE_APP_API_HOST,
    apiHosts: process.env.VUE_APP_API_HOSTS,
    qnUploadHost: process.env.VUE_APP_QN_UPLOAD_HOST,


    authTokenName: "mer-auth",
    authTokenPrefix: "",
    httpSuccessStatus: "200",
    loginExpire: "200302",
    permissionDenied: "30002",
    auditStatus: "audit_status",
    aliStatus: "ali_status",
    wxStatus: "wx_status",
    pay_channel_type: "pay_channel_type",
    lkl_status: "lkl_status",
    oemData: "_oemData",
    authRefreshTokenName: "refresh-auth"

});
export default webConfig;