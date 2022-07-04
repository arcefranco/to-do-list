 import { render as rtLRender, screen, fireEvent, waitFor } from "@testing-library/react";
 import { store } from "./store";
 import { Provider } from "react-redux";
import Home from "./components/Home/Home";


const render = component => rtLRender(
<Provider store={store}>
    {component}
</Provider>

)

test('on initial render', () => {
    render(<Home/>)

})
test('renders at least 2 inputs', () => {
    render(<Home/>)
    const input = screen.getAllByRole("textbox")
    expect(input.length).toBeGreaterThanOrEqual(2)
})
test('renders 1 button', () => {
    render(<Home/>)
    const input = screen.getAllByRole("button")
    expect(input.length).toBe(1)
})

test('title input should be To-do-list by default', () => {
    render(<Home/>)
    const input = screen.getByPlaceholderText(/title/i)
    expect(input.value).toBe("To-do-list")
})
test('message input should be empty', () => {
    render(<Home/>)
    const input = screen.getByPlaceholderText(/Escribí un item/i)
    expect(input.value).toBe("")
})
test('title input value should change', () => {
    render(<Home/>)
    const input = screen.getByPlaceholderText(/title/i)
    const test = "test"
    fireEvent.change(input, {target: {value: test}})
    expect(input.value).toBe(test)
})
test('message input value should change', () => {
    render(<Home/>)
    const input = screen.getByPlaceholderText(/Escribí un item/i)
    const test = "test"
    fireEvent.change(input, {target: {value: test}})
    expect(input.value).toBe(test)
}) 




 