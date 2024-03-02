import { auth } from '@clerk/nextjs';
import Droppzone from '@/components/Dropzone';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { FileType } from '@/typings';
import TableWrapper from '@/components/Table/TableWrapper';
async function Dashboard() {
  const { userId } = auth();

  const docResults = await getDocs(collection(db, 'users', userId!, 'files'));
  const skeletonFiles: FileType[] = docResults.docs.map((doc) => ({
    id: doc?.id,
    fileName: doc?.data().fileName || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));

  console.log(skeletonFiles);

  return (
    <div className="border-t">
      <Droppzone />

      <section className="container space-y-5">
        <h2 className="font-bold">All Files</h2>
        <div>
          {/* Table wrapper */}
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
