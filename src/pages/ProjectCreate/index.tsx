import { Button } from 'antd';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import Card from 'components/Card';
import EditorField from 'components/EditorField';
import Heading from 'components/Heading';
import InputField from 'components/InputField';
import SelectField from 'components/SelectField';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState, useAppDispatch } from 'redux/configureStore';
import { projectThunk } from 'redux/thunks/projectThunk';
import styles from './styles.module.scss';

const breadCrumbList = [
  { href: '/', title: 'Home' },
  { href: '/project', title: 'Project' },
  { title: 'Create Project' },
];

const CreateProjectSchema = Yup.object().shape({
  projectName: Yup.string().required('Please provide an project name.'),
});

interface Props {}

const ProjectCreate = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // get projectCategoryArr from redux store
  const { projectCategoryList } = useSelector((state: RootState) => state.options);

  // Formik
  const { values, errors, touched, handleSubmit, handleChange, handleBlur, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectName: '',
      description: '',
      categoryId: '1',
      alias: '',
    },
    validationSchema: CreateProjectSchema,
    onSubmit: async (values) => {
      const projectInsert = {
        ...values,
        categoryId: Number(values.categoryId),
      };
      try {
        const response = await dispatch(projectThunk.createProjectAuthorize(projectInsert)).unwrap();
        toast.success('Create a project successfully.');
        navigate(`/project/board/${response.id}`);
      } catch (err) {
        if (typeof err === 'string') {
          toast.error(err);
        } else {
          toast.error('Failed to create a project.');
        }
      }
    },
  });

  return (
    <div className={styles.projectCreateWrapper}>
      <div className={styles.heading}>
        <Heading
          breadCrumbList={breadCrumbList}
          title={'Create Project'}
        />
      </div>

      <Card className={styles.card}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.row}>
            <InputField
              label='Project name'
              name='projectName'
              value={values.projectName}
              error={errors.projectName}
              touched={touched.projectName}
              placeholder='Insert project name'
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className={styles.row}>
            <EditorField
              label='Desciption'
              name='description'
              height={250}
              value={values.description}
              setFieldValue={setFieldValue}
            />
          </div>

          <div className={styles.row}>
            <SelectField
              label='Project Category'
              name='categoryId'
              defaultValue='1'
              list={projectCategoryList}
              listLabel='projectCategoryName'
              listValue='id'
              setFieldValue={setFieldValue}
            />
          </div>

          <div className={styles.row + ' ' + styles.buttons}>
            <Button
              type='primary'
              htmlType='submit'
            >
              Create
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProjectCreate;
