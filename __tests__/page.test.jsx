import Home from "@/app/page";
import { render, screen } from '@testing-library/react'


jest.mock("../component/HomePage.jsx", () => () => <div>This is homepage component</div>)
describe("page component", () => {
    test("render header tag", () => {
        render(<Home />);

        const comp = screen.getByText(/this is homepage component/i);
        expect(comp).toBeInTheDocument();
    })
})