import ProvideInSyntax from "../../src/syntax/provide_in_syntax";
import { Container, interfaces } from "inversify";
import { expect } from "chai";
import "reflect-metadata";
import * as sinon from "sinon";
import ProvideDoneSyntax from "../../src/syntax/provide_done_syntax";

describe("ProvideInSyntax", () => {

    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("Should be able to declare a binding with singleton scope", () => {

        class Ninja {}
        let container = new Container();
        let bindingInSyntax = container.bind<Ninja>("Ninja").to(<any>null);
        let binding: interfaces.Binding<any> = (<any>bindingInSyntax)._binding;
        let provideDoneSyntax = new ProvideDoneSyntax<any>(binding);
        let bindingInSyntaxSpy = sandbox.spy(bindingInSyntax, "inSingletonScope");
        let provideInSyntax = new ProvideInSyntax(bindingInSyntax, provideDoneSyntax);

        provideInSyntax.inSingletonScope().done();
        expect(bindingInSyntaxSpy.callCount).eql(1);

    });

});
