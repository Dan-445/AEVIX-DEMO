import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

// Components
import JobCard from '../components/careers/JobCard';
import ApplicationForm from '../components/careers/ApplicationForm';

const Careers = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get('/api/careers');
                setJobs(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching jobs:', err);
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const filteredJobs = selectedDepartment === 'all' 
        ? jobs 
        : jobs.filter(job => job.department === selectedDepartment);

    return (
        <CareerWrapper>
            <Header>
                <h1>Join Our Team</h1>
                <p>Shape the future of AI and technology with us</p>
            </Header>

            <Section>
                <h2>Open Positions</h2>
                <FilterButtons>
                    <Button 
                        active={selectedDepartment === 'all'}
                        onClick={() => setSelectedDepartment('all')}
                    >
                        All
                    </Button>
                    {/* Add more filter buttons */}
                </FilterButtons>

                <JobsGrid>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        filteredJobs.map(job => (
                            <JobCard key={job._id} job={job} />
                        ))
                    )}
                </JobsGrid>
            </Section>

            <ApplicationForm />
        </CareerWrapper>
    );
};

// Styled components
const CareerWrapper = styled.main`
    padding-top: 80px;
`;

const Header = styled.section`
    text-align: center;
    padding: 4rem 5%;
    background: #fff;

    h1 {
        color: ${props => props.theme.primary};
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }
`;

// Add more styled components...

export default Careers; 