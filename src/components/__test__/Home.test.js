 import { render as rtLRender, screen, fireEvent, waitFor } from "@testing-library/react";
 import { store } from "../../store";
 import { Provider } from "react-redux";
import Home from "../Home";
import { getUser } from "../../reducers/user/userSlice";

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
test('renders at least 2 buttons', () => {
    render(<Home/>)
    const input = screen.getAllByRole("button")
    expect(input.length).toBeGreaterThanOrEqual(2)
})
test('renders the select tag', () => {
    render(<Home/>)
    const select = screen.getAllByRole("combobox")
    expect(select.length).toEqual(1)
})
test('title input should be empty', () => {
    render(<Home/>)
    const input = screen.getByPlaceholderText(/title/i)
    expect(input.value).toBe("")
})
test('message input should be empty', () => {
    render(<Home/>)
    const input = screen.getByPlaceholderText(/message/i)
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
    const input = screen.getByPlaceholderText(/message/i)
    const test = "test"
    fireEvent.change(input, {target: {value: test}})
    expect(input.value).toBe(test)
}) 




 