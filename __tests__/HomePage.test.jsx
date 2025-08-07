// import HomePage from "@/component/HomePage";
// import { render, screen, waitFor } from '@testing-library/react'
// import * as weatherActions from '@/app/actions/weather';
// import * as queryClientModule from '@/app/get-query-client';


// const mockedCities = ["Tehran", "Shiraz"];

// jest.mock("/app/actions/weather.js", () => ({
//     getCities: jest.fn(),
// }));

// jest.mock("/component/HeroSection.jsx", () => () => <div>hero section</div>);

// jest.mock("/component/SearchResult.jsx", () => ({ cities = [] }) => {
//     return <div data-testid="search-result">Search cities</div>
// });

// jest.mock('/app/get-query-client.js', () => ({
//     getQueryClient: jest.fn(),
// }));

// jest.mock('@tanstack/react-query', () => ({
//     ...jest.requireActual('@tanstack/react-query'),
//     HydrationBoundary: ({ children }) => <div>{children}</div>,
//     hydrate: jest.fn(),
// }));



// describe("HomePage component", () => {
//     let mockQueryClient;

//     beforeEach(() => {
//         // Mock queryClient with prefetchQuery method
//         mockQueryClient = {
//             prefetchQuery: jest.fn().mockResolvedValue(undefined),
//         };

//         // getQueryClient
//         //getcities
//         // Set up getQueryClient to return the mocked queryClient
//         queryClientModule.getQueryClient.mockReturnValue(mockQueryClient);

//         // Mock getCities to resolve with sample data
//         weatherActions.getCities.mockResolvedValue(['New York', 'London', 'Tokyo']);

//     });

//     test('should display hero section',async () => {
//         render(<HomePage />);
        

//         await waitFor(() => {
//             const hero = screen.getByText("hero section" , {exact: false});
//             expect(hero).toBeInTheDocument();
//         })

//     })
    

    
// })