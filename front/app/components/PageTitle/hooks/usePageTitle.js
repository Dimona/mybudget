import { useEffect, useState } from 'react';

const usePageTitle = pageTitle => {
    const [title, setTitle] = useState(pageTitle);

};

export default usePageTitle;
