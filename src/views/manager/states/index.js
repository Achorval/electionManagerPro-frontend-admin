// ** React Imports
import { useState, useEffect } from 'react';

// ** Third Party Components
import * as yup from 'yup';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import useAxios from 'core/utility/hooks/useAxios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import withReactContent from 'sweetalert2-react-content';

// ** Spinner (Splash Screen)
import FallbackSpinner from 'core/components/spinner/Loading-spinner';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { getStates, deleteState } from '../store';

// ** Icons Imports
import { Edit, Trash } from 'react-feather';
import empty from 'assets/images/svg/empty.svg';

// ** Reactstrap Imports
import { 
  Form, 
  Label, 
  Table, 
  Input, 
  Card, 
  Modal, 
  ModalBody, 
  ModalHeader, 
  CardHeader, 
  CardBody, 
  FormFeedback, 
  Button, 
  Spinner
} from 'reactstrap';

const StateList = () => {
  // ** Store Vars & Hooks
  const dispatch = useDispatch();
  const [isLoading] = useState(false);
  const [state, setState] = useState();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState('Add');
  const store = useSelector(state => state.system);
  
  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  
  const MySwal = withReactContent(Swal);

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getStates({
        page: currentPage,
        perPage: rowsPerPage
      })
    )
    // hideLoader()
  }, [dispatch, store && store.states.length]);

  // ** Handle perpage 
  const handlePerPage = e => {
    dispatch(
      getStates({
        page: currentPage,
        perPage: parseInt(e.target.value)
      })
    )
    setRowsPerPage(parseInt(e.target.value))
  };

  // ** Handle pagination
  const handlePagination = page => {
    dispatch(
      getStates({
        perPage: rowsPerPage,
        page: page.selected + 1
      })
    )
    setCurrentPage(page.selected + 1)
  };
  
  //** Default Values */
  const defaultValues = {
    name: ''
  };

  // ** Login Schema
  const stateSchema = yup.object().shape({
    name: yup.string().required('Name is a required field')
  });

  //** UseForm */
  const {
    reset,
    setValue,
    control,
    isSubmitting,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(stateSchema) })

  // ** Open modal
  const openAddModal = () => {
    setShow(!show);
    setSelected('Add');
  };

  // ** Close Modal
  const onModalClosed = () => {
    setShow(!show);
    setValue('name', "");
  };
  
  const onSubmit = async data => {
    try {
      if (selected === 'Add') {
        await useAxios.post('/api/admin/states/create', {
          name: data.name
        });
        reset();
        onModalClosed();
        toast.success('You have successfully logged in. Enjoy!');
        dispatch(
          getStates({
            page: currentPage,
            perPage: rowsPerPage
          })
        );
      } else {
        await useAxios.put(`/api/admin/states/update/${state.id}`, {
          name: data.name
        });
        reset();
        onModalClosed();
        toast.success('You have successfully logged in. Enjoy!');
        dispatch(
          getStates({
            page: currentPage,
            perPage: rowsPerPage
          })
        );
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        throw error;
      }
    }
  };

  // ** Handle edit click
  const handleEditClick = data => {
    setValue('name', data.name);
    setState(data);
    setShow(true);
    setSelected('Edit');
  };
  
  // ** Handle confirm cancel
  const handleConfirmCancel = (id) => {
    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        dispatch(deleteState(id))
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'State has been deleted.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Your state record is safe :)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  };
  
  let sn = 1;

  return (
    <div className='invoice-list-wrapper'>
      <h2 className='fw-bolder mb-75'>States</h2>
      <Card className='p-0'>
        <CardHeader>
          <div className='w-100'>
            <div className='float-end'>
              <Button className='me-0' color='secondary' size='sm' outline type='button' onClick={() => openAddModal()}>
                Add
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className='p-2'>
          {isLoading ? (
            <FallbackSpinner />
          ) : store && store.states && store.states.length > 0 ? (<>
            <Table hover responsive bordered>
              <thead className='text-center'>
                <tr>
                  <th>SN</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {store.states.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td><span className='fw-bold'>{sn++}</span></td>
                      <td><span className='fw-bold'>{value.name}</span></td>
                      <td>
                        <div className='d-flex justify-content-center'>
                          <Button 
                            size='sm' 
                            color='transparent' 
                            className='btn btn-icon' 
                            onClick={() => { 
                              handleEditClick(value)
                            }}>
                            <Edit className='font-medium-2' />
                          </Button>
                          <Button
                            size='sm'
                            color='transparent'
                            className='btn btn-icon'
                            onClick={() => handleConfirmCancel(value.id)}
                          >
                            <Trash className='font-medium-2' />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            <div className='d-flex justify-content-between align-items-center w-100 p-2'>
              <div className='px-0 px-lg-1'>
                <div className='d-flex align-items-center'>
                  <label htmlFor='rows-per-page'>Show</label>
                  <Input
                    type='select'
                    id='rows-per-page'
                    value={rowsPerPage}
                    onChange={handlePerPage}
                    className='form-control ms-50 pe-3'
                  >
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                  </Input>
                </div>
              </div>
              <div className='px-0 px-lg-1'>
                <ReactPaginate
                  nextLabel=''
                  breakLabel='...'
                  previousLabel=''
                  pageCount={Number((store.total / rowsPerPage).toFixed(0)) || 1}
                  activeClassName='active'
                  breakClassName='page-item'
                  pageClassName={'page-item'}
                  breakLinkClassName='page-link'
                  nextLinkClassName={'page-link'}
                  pageLinkClassName={'page-link'}
                  nextClassName={'page-item next'}
                  previousLinkClassName={'page-link'}
                  previousClassName={'page-item prev'}
                  onPageChange={page => handlePagination(page)}
                  forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                  containerClassName={'pagination react-paginate justify-content-end p-1'}
                />
              </div>
            </div>
          </>) : (
            <div className='text-center p-3 p-lg-5'>
              <img src={empty} />
              <h4 className='alert-heading mt-5'>You do not have any states list yet</h4>
            </div>
          )}
        </CardBody>
      </Card>

      {show && (
        <Modal isOpen={show} toggle={onModalClosed} className='modal-dialog-centered' onClosed={onModalClosed}>
          <ModalHeader className='bg-transparent' toggle={onModalClosed}></ModalHeader>
          <ModalBody className='px-sm-2 mx-50 pb-3'>
            <h1 className='text-center'>{selected === 'Add' ? 'Add New' : 'Edit'} State</h1>
            <Form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-userName'>
                  Name
                </Label>
                <Controller
                  id='name'
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='text'
                      placeholder='name'
                      invalid={errors.name && true}
                      {...field}
                    />
                  )}
                />
                {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
              </div>
              <Button disabled={isSubmitting} type='submit' className='p-1' color='primary' block>
                Add State {isSubmitting && <Spinner color='white' size='sm' />}
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      )}
    </div>
  )
}

export default StateList;