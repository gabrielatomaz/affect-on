class HttpStatusMatcher {
    isOkOrNotFound(object: any) {
        return !object || object.length == 0 || Object.keys(object).length === 0
            ? 404
            : 200;
    }
}

export default new HttpStatusMatcher();