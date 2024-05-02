import React, { useContext, useEffect } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { UserPointsContext } from '../Context/UserPointsContext.js'
import { getUserDetail } from './index.js';

export const GetPoint = () => {
  const { user } = useUser();
  const { setUserPoints, userPoints} = useContext(UserPointsContext);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await getUserDetail(user.primaryEmailAddress.emailAddress);
      if (resp.userDetail) {
        setUserPoints(Number(resp.userDetail?.point));
      } else
        setUserPoints(0);
    };

    fetchData();
  }, [user.primaryEmailAddress.emailAddress, setUserPoints]);
  return userPoints;
}


