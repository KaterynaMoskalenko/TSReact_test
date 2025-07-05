import { useDispatch, useSelector } from "react-redux";
import './ProjectList.scss';
import {  fetchProjects } from '../../store/ProjectSlice'; 
import { useEffect } from "react";
import DeleteProjectButton from './DeleteProjectButton';
import { useNavigate, useNavigation } from "react-router";
import { List, Card, Typography, Button, Space, Empty } from 'antd';

 export default function ProjectList() {
  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchProjects());
  },[])

  return (
    <div>
      <Typography.Title level={2}>Current List of Projects</Typography.Title>
      {projects.length === 0 ? (
         <Empty description="No projects yet" />
      ) : (      
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={projects}
          renderItem={(project) => (
            <List.Item>
              <Card
                title={project.name}
                extra={
                  <Space>
                    <Button onClick={() => {/* добавить toggleTasks */}}>Update</Button>
                    <Button onClick={() => navigate(`/projects/${project.id}/edit`)}>Edit</Button>
                    <DeleteProjectButton projectId={project.id} />
                  </Space>
                }
              >
                <Typography.Text>{project.shortDescription}</Typography.Text>
                <br />
                <Typography.Text type="secondary">
                  🗓 Start: {project.startDate} | End: {project.endDate}
                </Typography.Text>
              </Card>
            </List.Item>
          )}
        />
   
      )}
    </div>
  );
 }

