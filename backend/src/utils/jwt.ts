import jwt, { SignOptions } from "jsonwebtoken";

const secret: jwt.Secret = process.env.JWT_SECRET!;
type StringValue =
| `${number}`

export function generateToken(payload: object, expiresIn = `${1}Day` as StringValue) {
  const options: SignOptions = { expiresIn: expiresIn };
  return jwt.sign(payload, secret, options);
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret);
}
