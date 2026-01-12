FROM node:24-alpine

ENV WORKINGDIR=/root
WORKDIR ${WORKINGDIR}
RUN mkdir -p ${WORKINGDIR} && chmod 666 ${WORKINGDIR}
COPY . ${WORKINGDIR}/

RUN	npm install
RUN npx tsc

EXPOSE 3000

ENTRYPOINT [ "node", "." ]
