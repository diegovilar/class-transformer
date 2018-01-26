import "reflect-metadata";
import {classToPlain} from "../../src/index";
import {getMetadataStorage} from "../../src/storage";
import {Exclude, Expose} from "../../src/decorators";

describe("ignoring specific decorators", () => {

    it("when ignoreDecorators is set to true it should ignore all decorators", () => {
        getMetadataStorage().clear();

        class User {

            id: number;

            @Expose({ name: "lala" })
            firstName: string;

            @Expose({ groups: ["user"] })
            lastName: string;

            @Exclude()
            password: string;
        }

        const user = new User();
        user.firstName = "Umed";
        user.lastName = "Khudoiberdiev";
        user.password = "imnosuperman";

        const plainedUser = classToPlain(user, { ignoreDecorators: true });
        plainedUser.should.be.eql({
            firstName: "Umed",
            lastName: "Khudoiberdiev",
            password: "imnosuperman"
        });
    });

});