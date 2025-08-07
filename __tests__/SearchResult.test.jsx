import SearchResult from '@/component/SearchResult';
import userEvent from '@testing-library/user-event';
const { render, screen, fireEvent } = require("@testing-library/react")


jest.mock("/component/SearchWeather.jsx", () => ({ onInputChange }) => <input data-testid='search-weather-input' onChange={(e) => onInputChange(e.target.value)}/>);

jest.mock("/component/SearchButton.jsx", () => () => <button></button>);

jest.mock("/component/ResultBox.jsx", () => ({ city }) => <div data-testid="result-box">the selected city is {city}</div>)

describe("SearchResult component", () => {
    test('should render input field and not result component', () => {
        render(<SearchResult />);

        const inp = screen.getByTestId("search-weather-input");
        const result = screen.queryByTestId("result-box");// query so if item didnt found it doesnt give us err

        expect(inp).toBeInTheDocument();
        expect(result).not.toBeInTheDocument();
    });

    test("updates selectedCity and renders ResultBox when input changes", async () => {
        render(<SearchResult />);

        const inp = screen.getByTestId("search-weather-input");
        await userEvent.type(inp, "london");

        const result = screen.getByTestId("result-box");
        expect(result).toBeInTheDocument();
    });

    test("show correct result when user types city", async () => {
        render(<SearchResult />);

        const inp = screen.getByTestId("search-weather-input");
        await userEvent.type(inp, "london");

        const result = screen.getByTestId("result-box");
        expect(result).toHaveTextContent("london");
    });
    
})