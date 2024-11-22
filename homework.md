# DevTinder APIs

# authRouter
-Post /signup
-Post /login
-Post /logout

## profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

## connectionRequestRouter
-Post /request/send/intereted/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

## userRouter
-GET /user/connections
-GET /user/requests
-GET /user/feed
 