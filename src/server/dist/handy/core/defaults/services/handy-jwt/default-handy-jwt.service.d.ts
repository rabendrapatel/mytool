import { HandyConfigService, HandyUtilsService, HandyErrorService } from '@services';
import * as jsonWebToken from 'jsonwebtoken';
import { OnInit, ConfigJwtInterface, HandyTimeUnit, UnSignedObject, ServerRequestUser, UserAccessTokenPayload, TokenData, JwtType } from '@handy/types';
export declare class DefaultHandyJwtService implements OnInit {
    protected config: HandyConfigService;
    protected errorService: HandyErrorService;
    protected _jwt: typeof jsonWebToken;
    protected _settings: ConfigJwtInterface;
    protected _handyUtilsService: HandyUtilsService;
    protected _sufixesHolder: {
        [key: string]: JwtType;
    };
    protected _sufixesList: string[];
    protected _sufixesLen: number;
    constructor(config: HandyConfigService, errorService: HandyErrorService);
    onInit(): void;
    generateToken<Payload extends UnSignedObject = {}>(payLoad: Payload, jwtType?: JwtType): Promise<TokenData>;
    decodeToken<PayLoadType>(token: string): Promise<DecodedTokenPayload<PayLoadType>>;
    extractUserDataFormToken(token: string): Promise<ServerRequestUser>;
    generateEmptyServerRequestUser(): ServerRequestUser;
    generateKnownServerRequestUser(userData: UserAccessTokenPayload): ServerRequestUser;
    protected _getTokenType(token: string): JwtType;
    protected _parseSufixesHolder(): void;
}
interface DecodedTokenPayload<PayloadType> {
    data: PayloadType;
    expiryMoment: number;
    lifeSpan: number;
    expiresIn: number;
    lifeSpanUnit: HandyTimeUnit;
}
export {};
