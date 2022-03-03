import { firebaseLogin } from './firebaseAuth.service'
// import * as firebaseAuthFuncts from 'firebase/auth'
// import { UserCredential } from 'firebase/auth';

// describe('firebaseAuth', () => {
//     let signInWithEmailAndPasswordSpy: any;
//     // let signOutSpy: any;

//     beforeEach(() => {
//         signInWithEmailAndPasswordSpy = jest.spyOn(firebaseAuthFuncts, 'signInWithEmailAndPassword').mockResolvedValue({} as UserCredential);
//         // signOutSpy = jest.spyOn(firebaseAuthFuncts, 'signOut');
//     });

//     afterEach(() => {
//         jest.restoreAllMocks();
//     });

//     it('firebaseLogin should request signInWithEmailAndPassword', async () => {
//         // const output = { operationType: 'link'} as UserCredential
//         // signInWithEmailAndPasswordSpy.mockResolvedValue(output);
        
//         // const result = await firebaseLogin('test_user', 'test_password')
//         // expect(signInWithEmailAndPasswordSpy).toHaveBeenCalled();
//         // expect(result).toEqual(output)
//     })
// });