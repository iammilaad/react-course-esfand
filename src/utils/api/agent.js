import * as superagent from "superagent";
import { reduxGetter } from "utils/reduxGetter";
import { badRequestInterceptor, successInterceptor } from "./interceptors";
import request from "sync-request";
import _ from "lodash";
import config from "settings";

export const bareRequest = (bareCallback, parse = true) => {
    return (url, data = {}, query = {}, callback = null) => {
        const accessToken = reduxGetter(state =>
            state.getIn(["TOKEN", "access_token"], null)
        );
        const locale = reduxGetter(state =>
            state.getIn(["LanguageSwitcher", "language", "locale"] , "fa")
        );
        let agent;
        if(accessToken !== null) {
            agent = bareCallback(superagent, url, data, query)
                .withCredentials()
                .set("Authorization", `Bearer ${accessToken}`)
                .set("Accept-Language", locale)
                .set("Accept", 'application/json')
                .use(successInterceptor)
                .use(badRequestInterceptor);
        } else {
            agent = bareCallback(superagent, url, data, query)
                .withCredentials()
                .set("Accept-Language", locale)
                .use(successInterceptor)
                .use(badRequestInterceptor);
        }


        if (callback !== null) {
            agent = callback(agent);
        }

        if (parse !== true) {
            return agent;
        }

        return agent.then(response => {
            if (response.statusCode === 200 || response.statusCode === 201) {
                return response.body;
            } else {
                throw response.text;
            }
        });
    };
};

const apiRoot = config.apiUrl;
export const getRequest = bareRequest((request, url, query) =>
    request.get(apiRoot + url).query(query)
);
export const deleteRequest = bareRequest((request, url, data, query) =>
    request
        .delete(apiRoot + url)
        .query(query)
        .send(data)
);
export const putRequest = bareRequest((request, url, data) =>
    request.put(apiRoot + url).send(data)
);
export const postRequest = bareRequest((request, url, data, query) =>
    request
        .post(apiRoot + url)
        .query(query)
        .send(data)
);
export const multiPartPostRequest = bareRequest((request, url, data) => {
    const { files, fields } = data;
    let req = request.post(apiRoot + url);
    _.forEach(fields, (val, name) => {
        req.field(name, val);
    });

    _.forEach(files, (val, name) => {
        req.attach(name, val);
    });

    return req;
});
export const downloadRequest = bareRequest(
    (request, url, data) => request.get(apiRoot + url),
    false
);

export const syncRequest = (method, url) => {
    const accessToken = reduxGetter(state =>
        state.getIn(["TOKEN", "access_token"])
    );
    const responseBody = request(method, apiRoot + url, {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    }).getBody("utf8");

    return JSON.parse(responseBody);
};
