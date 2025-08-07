const { default: SearchWeather } = require("@/component/SearchWeather");
const { useQuery } = require("@tanstack/react-query");
const { render, screen, fireEvent, waitFor } = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");



jest.mock("/app/actions/weather.js", () => ({
    getCities: jest.fn(() => Promise.resolve([
        { city: 'London', code: 'GB', country: 'United Kingdom' },
        { city: 'Paris', code: 'FR', country: 'France' },
        { city: 'Tokyo', code: 'JP', country: 'Japan' }
    ]))
}));

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn()
}));

describe("SearchWeather input field", () => {
    const mockedOnInputChange = jest.fn();
    beforeEach(() => {
        mockedOnInputChange.mockClear();
        useQuery.mockReturnValue({
            data: [
                { city: 'London', code: 'GB', country: 'United Kingdom' },
                { city: 'Paris', code: 'FR', country: 'France' },
                { city: 'Tokyo', code: 'JP', country: 'Japan' },
                { city: 'Baghdad', code: 'IQ', country: 'Iraq' },
                { city: 'Baku', code: 'AZ', country: 'Azerbaijan' },
            ],
            isLoading: false,
            error: null
        });
    });

    test('should display input field with correct label', () => {
        render(<SearchWeather onInputChange={mockedOnInputChange} />);

        const inp = screen.getByTestId('search-weather-input');
        const textfield = screen.getByLabelText("Choose a country");

        expect(inp).toBeInTheDocument();
        expect(textfield).toBeInTheDocument();
    })
    
    test('display options when typing ', async () => {
        render(<SearchWeather onInputChange={mockedOnInputChange} />);

        const inp = screen.getByTestId('search-weather-input');

        userEvent.type(inp, "ba");

        await waitFor(() => {
            expect(screen.getByText("Baghdad", { exact: false })).toBeInTheDocument();
            expect(screen.getByText("Baku", { exact: false })).toBeInTheDocument();
            expect(screen.queryByText("Paris", { exact: false })).not.toBeInTheDocument();
        });
    });

    test('onInputChange triggers with correct data ', async () => {
        render(<SearchWeather onInputChange={mockedOnInputChange} />);

        const inp = screen.getByTestId('search-weather-input');

        userEvent.type(inp, "ba");

        await waitFor(() => {
            expect(screen.getByText("Baghdad", { exact: false })).toBeInTheDocument();
            expect(screen.getByText("Baku", { exact: false })).toBeInTheDocument();
        });

        await userEvent.click(screen.getByText("Baku, Azerbaijan", { exact: false }));

        expect(mockedOnInputChange).toHaveBeenCalledWith({
            name: 'Baku',
            code: 'AZ'
        });
    });

    test('renders empty options when data is undefined',async () => {
        useQuery.mockReturnValue({
            data: undefined,
            isLoading: false,
            error: null
        });

        render(<SearchWeather onInputChange={mockedOnInputChange} />);

        const inp = screen.getByTestId('search-weather-input');
        await userEvent.type(inp, "a");

        inp.focus();
        await userEvent.keyboard("{ArrowDown}");

        const options = screen.queryAllByRole("option");

        // No options should appear
        expect(options).toHaveLength(0);
        expect(mockedOnInputChange).not.toHaveBeenCalled();
    });
})