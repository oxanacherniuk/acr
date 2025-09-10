import { useNavigate } from 'react-router-dom';

export function useAnimatedNavigate() {
    const navigate = useNavigate();

    const animatedNavigate = (to: string) => {
        document.body.classList.add('animating');
        
        setTimeout(() => {
            navigate(to);
            setTimeout(() => {
                document.body.classList.remove('animating');
            }, 600);
        }, 100);
    };

    return animatedNavigate;
}