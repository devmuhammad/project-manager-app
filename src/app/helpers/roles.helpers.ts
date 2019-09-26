import { store } from 'src/app/store';
/**
 * name 'GETROLES'
 * @param 'string'
 * @returns boolean | True when user has the required role
 * otherwise returns false
 */

const profile = JSON.parse(localStorage.getItem('profile'));
export const getRoles = (userRole: string) => {
    const previlages = [];
    // const { groups } = store.getState().auth.data;
    const {groups} = profile;
    if (groups) {
      for (const item of groups) {
        if (item) {
          item.roles.map((role: any) => {
            previlages.push(role.name);
          });
        }

        return previlages.includes(userRole);
      }
    }
  };