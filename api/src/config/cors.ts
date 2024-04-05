const configuracaoCors = {
    async configcors() {
        const whitelist = [];

        let config = null;

        if (process.env.NODE_ENV == 'dev') {
            config = {
                origin: '*'
            }
        }

        if (process.env.NODE_ENV == 'prod') {
            config = {
                origin: function (origin, callback) {
                    console.log('Origin:', origin);
                    if (whitelist.indexOf(origin) !== -1) {
                        callback(null, true);
                    } else {
                        callback(new Error("Not allowed by CORS"));
                    }
                }
            }
        }

        return config;
    }
}

export default configuracaoCors;