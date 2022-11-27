FROM node:14.18.0

ENV PORT 3001
ENV NEXT_TELEMETRY_DISABLED 1

ADD . .
RUN yarn install
RUN yarn build
EXPOSE 3001

ENTRYPOINT [ "yarn", "start" ]
