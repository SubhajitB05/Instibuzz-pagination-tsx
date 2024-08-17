import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Define the props type
interface SkeletonLoadingProps {
  number: number;
}

const SkeletonLoading: React.FC<SkeletonLoadingProps> = ({ number }) => {
  return (
    <div>
      {Array(number)
        .fill(0)
        .map((_, index:number) => {
          return (
            <div
              style={{
                padding: '10px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
              }}
              key={index}
              className="shadow-sm d-flex flex-column gap-2 mb-3"
            >
              <Skeleton height={30} />
              <Skeleton height={55} />
            </div>
          );
        })}
    </div>
  );
};

export default SkeletonLoading;
