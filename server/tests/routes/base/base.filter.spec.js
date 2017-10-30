import { expect } from 'chai';
import server from '../../utils/server.mock';
import User from '../../../models/user';

import UserFactory from '../../factories/user.factory';

const ENDPOINT = '/api/auth/register';

let user;
let admin;

describe(`Base Controller Filter Params`, () => {
  before(async () => {
    await User.remove({});

    user = await User.create(UserFactory.generate());
    admin = await User.create(UserFactory.generateAdmin());
  });

  // it('removes un whitelisted parameters', done => {
  //   server
  //     .post(ENDPOINT)
  //     .send({ name: 'test', extra1: 'asd', extra2: 'asd' })
  //     .set('Authorization', admin.generateToken())
  //     .end((err, res) => {
  //       console.log(res.body);
  //       expect(res).to.have.status(201);

  //       expect(res.body.extra1).to.not.exist;
  //       expect(res.body.extra2).to.not.exist;
  //       done();
  //     });
  // });
});
