import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import NavBar from '../app/components/NavBar'
import AddProduct from '../app/components/AddProducts'
import EditProductModal from '../app/components/EditProducts'
import DeleteModal from './components/DeleteModal'

// -------------------------
// Mock react-hot-toast
// -------------------------
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}))

// -------------------------
// Mock useDispatch safely
// -------------------------
const mockDispatch = jest.fn(() => ({
  unwrap: () => Promise.resolve(), // resolves immediately for testing
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}))

// -------------------------
// Mock Next.js Link
// -------------------------
jest.mock('next/link', () => ({ children }) => children)

// -------------------------
// NavBar test
// -------------------------
describe('NavBar component', () => {
  test('renders navbar title', () => {
    render(<NavBar />)

    expect(
      screen.getByText('Stock Management Dashboard')
    ).toBeInTheDocument()
  })
})

// -------------------------
// AddProduct tests
// -------------------------
describe('AddProduct component', () => {
  const onCloseMock = jest.fn()

  beforeEach(() => {
    onCloseMock.mockClear()
    mockDispatch.mockClear()
  })

  test('renders all inputs and button', () => {
    render(<AddProduct onClose={onCloseMock} />)

    expect(screen.getByPlaceholderText("Men's T-Shirt")).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByPlaceholderText("25.00")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("100")).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add product/i })).toBeInTheDocument()
  })

  test('can type into inputs', () => {
    render(<AddProduct onClose={onCloseMock} />)

    const nameInput = screen.getByPlaceholderText("Men's T-Shirt")
    const categorySelect = screen.getByRole('combobox')
    const priceInput = screen.getByPlaceholderText("25.00")
    const quantityInput = screen.getByPlaceholderText("100")

    fireEvent.change(nameInput, { target: { value: 'Shirt' } })
    fireEvent.change(categorySelect, { target: { value: 'Apparel' } })
    fireEvent.change(priceInput, { target: { value: '25' } })
    fireEvent.change(quantityInput, { target: { value: '50' } })

    expect(nameInput.value).toBe('Shirt')
    expect(categorySelect.value).toBe('Apparel')
    expect(priceInput.value).toBe('25')
    expect(quantityInput.value).toBe('50')
  })

  test('calls onClose when form is submitted', async () => {
    render(<AddProduct onClose={onCloseMock} />)

    fireEvent.change(screen.getByPlaceholderText("Men's T-Shirt"), { target: { value: 'Shirt' } })
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Apparel' } })
    fireEvent.change(screen.getByPlaceholderText("25.00"), { target: { value: '25' } })
    fireEvent.change(screen.getByPlaceholderText("100"), { target: { value: '50' } })

    fireEvent.click(screen.getByRole('button', { name: /add product/i }))

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled()
    })
  })
})

// -------------------------
// EditProductModal tests
// -------------------------
describe('EditProductModal component', () => {
  const onCloseMock = jest.fn()
  const sampleProduct = {
    id: 1,
    name: 'Shirt',
    category: 'Apparel',
    price: 25,
    quantity: 100,
  }

  beforeEach(() => {
    onCloseMock.mockClear()
    mockDispatch.mockClear()
  })

  test('renders form with product data', () => {
    render(
      <EditProductModal open={true} onClose={onCloseMock} product={sampleProduct} />
    )

    expect(screen.getByPlaceholderText("Men's T-Shirt").value).toBe('Shirt')
    expect(screen.getByRole('combobox').value).toBe('Apparel')
    expect(screen.getByPlaceholderText("25.00").value).toBe('25')
    expect(screen.getByPlaceholderText("100").value).toBe('100')
    expect(screen.getByRole('button', { name: /save product/i })).toBeInTheDocument()
  })

  test('can type into inputs', () => {
    render(
      <EditProductModal open={true} onClose={onCloseMock} product={sampleProduct} />
    )

    const nameInput = screen.getByPlaceholderText("Men's T-Shirt")
    const categorySelect = screen.getByRole('combobox')
    const priceInput = screen.getByPlaceholderText("25.00")
    const quantityInput = screen.getByPlaceholderText("100")

    fireEvent.change(nameInput, { target: { value: 'T-Shirt' } })
    fireEvent.change(categorySelect, { target: { value: 'Electronics' } })
    fireEvent.change(priceInput, { target: { value: '50' } })
    fireEvent.change(quantityInput, { target: { value: '200' } })

    expect(nameInput.value).toBe('T-Shirt')
    expect(categorySelect.value).toBe('Electronics')
    expect(priceInput.value).toBe('50')
    expect(quantityInput.value).toBe('200')
  })

  test('calls onClose when form is submitted', async () => {
  render(
    <EditProductModal open={true} onClose={onCloseMock} product={sampleProduct} />
  )

  // Click save
  fireEvent.click(screen.getByRole('button', { name: /save product/i }))

  // Wait for async dispatch + onClose
  await waitFor(() => {
    expect(onCloseMock).toHaveBeenCalled()
    expect(mockDispatch).toHaveBeenCalled() // ✅ dispatch was called
  })
})


// -------------------------
// DeleteModal tests
// -------------------------
describe('DeleteModal component', () => {
  const onCloseMock = jest.fn()
  const onConfirmMock = jest.fn()
  const productName = 'Shirt'

  beforeEach(() => {
    onCloseMock.mockClear()
    onConfirmMock.mockClear()
  })

  test('does not render when open is false', () => {
    render(
      <DeleteModal
        open={false}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        productName={productName}
      />
    )

    // Modal should not be in the document
    expect(screen.queryByText(/Delete Product/i)).not.toBeInTheDocument()
  })

  test('renders correctly when open is true', () => {
    render(
      <DeleteModal
        open={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        productName={productName}
      />
    )

    // Check title and product name are rendered
    expect(screen.getByText(/Delete Product/i)).toBeInTheDocument()
    expect(screen.getByText(/Are you sure you want to delete/i)).toBeInTheDocument()
    expect(screen.getByText(productName)).toBeInTheDocument()

    // Buttons
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  test('calls onClose when Cancel button is clicked', () => {
    render(
      <DeleteModal
        open={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        productName={productName}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }))
    expect(onCloseMock).toHaveBeenCalled()
  })

  test('calls onConfirm when Delete button is clicked', () => {
    render(
      <DeleteModal
        open={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        productName={productName}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    expect(onConfirmMock).toHaveBeenCalled()
  })
})

})
