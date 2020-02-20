import ky from 'ky-universal';

export let http: typeof ky;

if (process == null) {
  http = ky;
} else {
  http = ky.create({ prefixUrl: `http://localhost:${process.env.PORT}` });
}
