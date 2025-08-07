import HeroSection from "@/component/HeroSection";
const { render, screen } = require("@testing-library/react")


describe("Hero Section", () => {
    test('should sun background be on page', () => {
        render(<HeroSection />);

        const sonEl = screen.getByTestId("sun-div");
        expect(sonEl).toBeInTheDocument();
    })

    test('should header title be on page', () => {
        render(<HeroSection />);

        const header = screen.getByRole("heading", { level: 1 });
        expect(header).toBeInTheDocument();
    });
    
})